defmodule Coinbase.CoinbaseApi do
  @base_url "https://api.coinbase.com/v2/prices/"

  alias HTTPoison
  alias Poison

  def get_price(curr, period, port) do
    case port do
      "gdax" ->
        gdax_adapter(get_gdax_price(curr, period))
      "coinbase" ->
        coinbase_adapter(get_coinbase_price(curr, period))
    end
  end

  def coinbase_adapter(res) do
    {:ok, %{ "data" => data}} = res
    Enum.map(data["prices"], fn(temp) -> %{x: temp["time"], y: temp["price"]} end)
  end

  def gdax_adapter(res) do
    {:ok, data} = res
    Enum.map(data, fn(temp) -> %{x: temp |> Enum.fetch!(0) |> DateTime.from_unix!() |> DateTime.to_iso8601(), y: Enum.fetch!(temp, 4)} end)
  end

  def get_price(curr, port) do
    case port do
      "gdax" ->
        {:ok , data} = get_gdax_price(curr)
        data["price"]
      "coinbase" ->
        %{"data" => data} = get_coinbase_price(curr)
        data["amount"]

    end
  end
  def get_gdax_price(curr, period) do
    {starttime, endtime, granularity} = get_time_pair(period)
    url = construct_url(get_code(curr), starttime, endtime, granularity)
    http_request(url)
  end

  def get_gdax_price(curr) do
    url = construct_url(get_code(curr))
    http_request(url)
  end

  def get_coinbase_price(curr, period) do
    url = construct_url(get_code(curr), period)
    http_request(url)

  end


  def get_coinbase_price(curr) do
    buy_url = construct_url_buy(get_code(curr))
    sell_url = construct_url_sell(get_code(curr))
    {:ok, buy_res} = http_request(buy_url)
    buy_res
  end

  def get_diff(period) do
    case period do
      "year" ->
        {365*24*60*60, 86400}
      "month" ->
        {30*24*60*60, 86400}
      "week" ->
        {7*24*60*60, 21600}
      "day" ->
        {24*60*60, 3600}
      "hour" ->
        {60*60, 300}
    end
  end
  def get_time_pair(period) do
    now = DateTime.utc_now()
    utc = DateTime.to_unix(now)
    {diff, granularity} = get_diff(period)
    {DateTime.to_iso8601(DateTime.from_unix!(utc-diff)), DateTime.to_iso8601(now) , granularity}
  end

  def http_request(url) do
    case HTTPoison.get(url) do
      {:ok, %{status_code: 200, body: body}} ->
        {:ok, Poison.decode!(body)}

      {:ok, %{status_code: 404}} ->
        {:error, "404"}

      {:error, %{reason: reason}} ->
        # do something with an error
        {:error, reason}
    end
  end

  def get_code(curr) do
    case curr do
      "Bitcoin" ->
        'BTC'
      "Ethereum" ->
        'ETH'
      "Litcoin" ->
        'LTC'
      "Cash" ->
        'BCH'
    end
  end

 
  def construct_url_buy(curr) do
    "https://api.coinbase.com/v2/prices/#{curr}-USD/buy"
  end

  def construct_url_sell(curr) do
    "https://api.coinbase.com/v2/prices/#{curr}-USD/sell"
  end

  def construct_url(curr) do
    "https://api.gdax.com/products/#{curr}-USD/ticker"
  end
  def construct_url(curr, period) do
    "https://api.coinbase.com/v2/prices/#{curr}-USD/historic?period=#{period}"
  end

  def construct_url(curr, starttime, endtime, granularity) do
    "https://api.gdax.com/products/#{curr}-USD/candles?start=#{starttime}&end=#{endtime}&granularity=#{granularity}"
  end

end
