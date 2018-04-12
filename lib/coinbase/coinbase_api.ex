defmodule Coinbase.CoinbaseApi do
  @base_url "https://api.coinbase.com/v2/prices/"

  alias HTTPoison
  alias Poison

  def get_price(curr, period) do
    url = construct_url(get_code(curr), period)
    http_request(url)

  end

  def get_price(curr) do
    buy_url = construct_url_buy(get_code(curr))
    sell_url = construct_url_sell(get_code(curr))
    {:ok, buy_res} = http_request(buy_url)
    {:ok, sell_res} = http_request(sell_url)
    %{buy: buy_res, sell: sell_res}
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


  def construct_url(curr, period) do
    "https://api.coinbase.com/v2/prices/#{curr}-USD/historic?period=#{period}"
  end

end
