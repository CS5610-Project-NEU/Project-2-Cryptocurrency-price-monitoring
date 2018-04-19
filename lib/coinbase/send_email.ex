defmodule Coinbase.SendEmail do
  use GenServer
  use CoinbaseWeb, :controller
  import Coinbase.CoinbaseApi

  #require Ecto.Query, warn: false
  import Ecto.Query, warn: false

  import Swoosh.Email
  alias Coinbase.Coins.Coin_alert
  alias Coinbase.Users.User
  alias Coinbase.Coins.Coin
  alias Coinbase.Repo
  alias Coinbase.SendgridMailer
  alias CoinbaseWeb.UserEmail


  @default_to "vipulsharma018@gmail.com"

  @mailers %{
    "sendgrid" => SendgridMailer,
  }

  plug :scrub_params, "email" when action in [:send]

  def start_link() do
    GenServer.start_link __MODULE__, %{}
  end

  ## SERVER ##

  def init(_state) do
    IO.inspect "+++++++++++++Email INIT++++++++++++++"

    send_mail_by_threshold()





    schedule_timer(1800_000) # 1 sec timer
    {:ok, "Sending"}
  end


  def handle_info(:update, interval) do

    send_mail_by_threshold()


    schedule_timer(1800_000)
    {:noreply, ""}
  end

  def send_mail_by_threshold() do

    bitcoin_curr_coinbase=  String.to_float(get_price("Bitcoin","coinbase"))
    ethereum_curr_coinbase= String.to_float(get_price("Ethereum","coinbase"))
    litcoin_curr_coinbase= String.to_float(get_price("Litcoin","coinbase"))
    cash_curr_coinbase= String.to_float(get_price("Cash","coinbase"))

    below_list = get_alert_list(0)
    above_list = get_alert_list(1)



    above_list_bitcoin =  Enum.filter(above_list, fn(x) -> x.amount < bitcoin_curr_coinbase and x.coin_id == 1 end)
    above_list_ethereum =  Enum.filter(above_list, fn(x) -> x.amount < ethereum_curr_coinbase and x.coin_id == 2 end)
    above_list_litcoin =  Enum.filter(above_list, fn(x) -> x.amount < litcoin_curr_coinbase and x.coin_id == 3 end)
    above_list_cash =  Enum.filter(above_list, fn(x) -> x.amount < cash_curr_coinbase and x.coin_id == 4 end)


    below_list_bitcoin =  Enum.filter(below_list, fn(x) -> x.amount >= bitcoin_curr_coinbase and x.coin_id == 1 end)
    below_list_ethereum =  Enum.filter(below_list, fn(x) -> x.amount >= ethereum_curr_coinbase and x.coin_id == 2 end)
    below_list_litcoin =  Enum.filter(below_list, fn(x) -> x.amount >= litcoin_curr_coinbase and x.coin_id == 3 end)
    below_list_cash =  Enum.filter(below_list, fn(x) -> x.amount >= cash_curr_coinbase and x.coin_id == 4 end)


    send_info(above_list_bitcoin,"bitcoin",bitcoin_curr_coinbase,"above")
    send_info(above_list_ethereum,"ethereum",ethereum_curr_coinbase,"above")
    send_info(above_list_litcoin,"litcoin",litcoin_curr_coinbase,"above")
    send_info(above_list_cash,"bitcoin cash",cash_curr_coinbase,"above")


    send_info(below_list_bitcoin,"bitcoin",bitcoin_curr_coinbase,"below")
    send_info(below_list_ethereum,"ethereum",ethereum_curr_coinbase,"below")
    send_info(below_list_litcoin,"litcoin",litcoin_curr_coinbase,"below")
    send_info(below_list_cash,"bitcoin cash",cash_curr_coinbase,"below")



  #  send_mail("vipulsharma018@gmail.com","heaeeeredasdasd","testingtesing")

  end




  def send_info(items,coin,price,controll) do

    alert = "buy it!"
    if controll == "above" do
      alert = "sell it!"
    end

    header =  "The price of  #{coin} is #{controll} your threshold"
    body = "The price of  #{coin} is #{price}, #{alert}"

    Enum.map(items, fn(i) -> send_mail(i.user.email,header,body) end)


  end



  def get_alert_list(threshold) do

    query = Ecto.Query.from c_a in Coin_alert,
                            where: c_a.above == ^threshold,
                            select: c_a

    res = Repo.all(query)
          |> Repo.preload(:user)

    res

  end

  defp schedule_timer(interval) do
    Process.send_after self(), :update, interval
  end

  def send_mail(email_address,header,body) do
    UserEmail.welcome(email_address,header,body)
    |> SendgridMailer.deliver
    |> case do
         {:ok, _result} ->
           IO.inspect("Email sent successfully")
         {:error, _reason} ->
           IO.inspect("There was an error while sending the email")
       end
  end

end
