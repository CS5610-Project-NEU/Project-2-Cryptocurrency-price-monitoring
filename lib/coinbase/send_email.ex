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





    schedule_timer(2_000) # 1 sec timer
    {:ok, "Sending"}
  end


  def handle_info(:update, interval) do

    send_mail_by_threshold()


    schedule_timer(2_000)
    {:noreply, ""}
  end

  def send_mail_by_threshold() do

    bitcoin_curr_coinbase=  String.to_float(get_price("Bitcoin","coinbase"))
    ethereum_curr_coinbase= String.to_float(get_price("Ethereum","coinbase"))
    litcoin_curr_coinbase= String.to_float(get_price("Litcoin","coinbase"))
    cash_curr_coinbase= String.to_float(get_price("Cash","coinbase"))

    below_list = get_alert_list(0)
    above_list = get_alert_list(1)

    IO.inspect cash_curr_coinbase

    above_list_bitcoin =  Enum.filter(above_list, fn(x) -> x.amount >= bitcoin_curr_coinbase end)
    above_list_ethereum =  Enum.filter(above_list, fn(x) -> x.amount >= ethereum_curr_coinbase end)
    above_list_litcoin =  Enum.filter(above_list, fn(x) -> x.amount >= litcoin_curr_coinbase end)
    above_list_cash =  Enum.filter(above_list, fn(x) -> x.amount >= cash_curr_coinbase end)


    below_list_bitcoin =  Enum.filter(above_list, fn(x) -> x.amount < bitcoin_curr_coinbase end)
    below_list_ethereum =  Enum.filter(above_list, fn(x) -> x.amount < ethereum_curr_coinbase end)
    below_list_litcoin =  Enum.filter(above_list, fn(x) -> x.amount < litcoin_curr_coinbase end)
    below_list_cash =  Enum.filter(above_list, fn(x) -> x.amount < cash_curr_coinbase end)


    IO.inspect above_list_cash
  #  IO.inspect above_list

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

  def send_mail(email_addres) do
    email_address ="vipulsharma018@gmail.com"
    UserEmail.welcome(email_address)
    |> SendgridMailer.deliver
    |> case do
         {:ok, _result} ->
           IO.inspect("Email sent successfully")
         {:error, _reason} ->
           IO.inspect("There was an error while sending the email")
       end
  end

end
