defmodule Coinbase.UpdateChannel do
  use GenServer
  import Coinbase.CoinbaseApi


  def start_link() do
    GenServer.start_link __MODULE__, %{}
  end

  ## SERVER ##

  def init(_state) do
    IO.inspect "hihihihi start"

#    bitcoin_curr_gdax = get_price("Bitcoin","gdax")
#    bitcoin_month_gdax = get_price("Bitcoin","month","gdax")
#    bitcoin_week_gdax = get_price("Bitcoin","week","gdax")
#    Process.sleep(1100)
#    bitcoin_day_gdax = get_price("Bitcoin","day","gdax") ### something wrong
#    bitcoin_hour_gdax = get_price("Bitcoin","hour","gdax")
#
#    ##################
#    ethereum_curr_gdax = get_price("Ethereum","gdax")
#    Process.sleep(1100)
#    ethereum_month_gdax= get_price("Ethereum","month","gdax")
#    ethereum_week_gdax= get_price("Ethereum","week","gdax")
#    ethereum_day_gdax= get_price("Ethereum","day","gdax")
#    Process.sleep(1100)
#    ethereum_hour_gdax = get_price("Ethereum","hour","gdax")
#    #
#    #####################
#    litcoin_curr_gdax= get_price("Litcoin","gdax")
#    litcoin_month_gdax= get_price("Litcoin","month","gdax")
#    Process.sleep(1100)
#    litcoin_week_gdax= get_price("Litcoin","week","gdax")
#    litcoin_day_gdax= get_price("Litcoin","day","gdax")
#    litcoin_hour_gdax= get_price("Litcoin","hour","gdax")
#    ########################################
#    Process.sleep(1100)
#    cash_curr_gdax= get_price("Cash","gdax")
#    cash_month_gdax= get_price("Cash","month","gdax")
#
#    Process.sleep(1100)
#    cash_week_gdax= get_price("Cash","week","gdax")
#    cash_day_gdax= get_price("Cash","day","gdax")
#    cash_hour_gdax= get_price("Cash","hour","gdax")

    state = %{
      ### bitcoin data
      bitcoin_curr_coinbase: get_price("Bitcoin","coinbase"),
      bitcoin_month_coinbase: get_price("Bitcoin","month","coinbase"),
      bitcoin_week_coinbase: get_price("Bitcoin","week","coinbase"),
      bitcoin_day_coinbase: get_price("Bitcoin","day","coinbase"),
      bitcoin_hour_coinbase: get_price("Bitcoin","hour","coinbase"),
      bitcoin_year_coinbase: get_price("Bitcoin","year","coinbase"),
#      bitcoin_curr_gdax: bitcoin_curr_gdax,
#      bitcoin_month_gdax: bitcoin_month_gdax,
#      bitcoin_week_gdax: bitcoin_week_gdax,
#      bitcoin_day_gdax: bitcoin_day_gdax,
#      bitcoin_hour_gdax: bitcoin_hour_gdax,
#      #
      #      ### ethereum data
      ethereum_curr_coinbase: get_price("Ethereum","coinbase"),
      ethereum_month_coinbase: get_price("Ethereum","month","coinbase"),
      ethereum_week_coinbase: get_price("Ethereum","week","coinbase"),
      ethereum_day_coinbase: get_price("Ethereum","day","coinbase"),
      ethereum_hour_coinbase: get_price("Ethereum","hour","coinbase"),
      ethereum_year_coinbase: get_price("Ethereum","year","coinbase"),
#      ethereum_curr_gdax: ethereum_curr_gdax,
#      ethereum_month_gdax: ethereum_month_gdax,
#      ethereum_week_gdax: ethereum_week_gdax,
#      ethereum_day_gdax: ethereum_day_gdax,
#      ethereum_hour_gdax: ethereum_hour_gdax,
      #
      #      ### litcoin data
      litcoin_curr_coinbase: get_price("Litcoin","coinbase"),
      litcoin_month_coinbase: get_price("Litcoin","month","coinbase"),
      litcoin_week_coinbase: get_price("Litcoin","week","coinbase"),
      litcoin_day_coinbase: get_price("Litcoin","day","coinbase"),
      litcoin_hour_coinbase: get_price("Litcoin","hour","coinbase"),
      litcoin_year_coinbase: get_price("Litcoin","year","coinbase"),
#      litcoin_curr_gdax: litcoin_curr_gdax,
#      litcoin_month_gdax: litcoin_month_gdax,
#      litcoin_week_gdax: litcoin_week_gdax,
#      litcoin_day_gdax: litcoin_day_gdax,
#      litcoin_hour_gdax: litcoin_hour_gdax,
      #
      #      ### cash data
      cash_curr_coinbase: get_price("Cash","coinbase"),
      cash_month_coinbase: get_price("Cash","month","coinbase"),
      cash_week_coinbase: get_price("Cash","week","coinbase"),
      cash_day_coinbase: get_price("Cash","day","coinbase"),
      cash_hour_coinbase: get_price("Cash","hour","coinbase"),
      cash_year_coinbase: get_price("Cash","year","coinbase"),
#      cash_curr_gdax: cash_curr_gdax,
#      cash_month_gdax: cash_month_gdax,
#      cash_week_gdax: cash_week_gdax,
#      cash_day_gdax: cash_day_gdax,
#      cash_hour_gdax: cash_hour_gdax,


    }

    broadcast state


    schedule_timer(1_000) # 1 sec timer
    {:ok, state}
  end


  def handle_info(:update, interval) do

#    bitcoin_curr_gdax = get_price("Bitcoin","gdax")
#    bitcoin_month_gdax = get_price("Bitcoin","month","gdax")
#    bitcoin_week_gdax = get_price("Bitcoin","week","gdax")
#    Process.sleep(1100)
#    bitcoin_day_gdax = get_price("Bitcoin","day","gdax") ### something wrong
#    bitcoin_hour_gdax = get_price("Bitcoin","hour","gdax")
#
#    ##################
#    ethereum_curr_gdax = get_price("Ethereum","gdax")
#    Process.sleep(1100)
#    ethereum_month_gdax= get_price("Ethereum","month","gdax")
#    ethereum_week_gdax= get_price("Ethereum","week","gdax")
#    ethereum_day_gdax= get_price("Ethereum","day","gdax")
#    Process.sleep(1100)
#    ethereum_hour_gdax = get_price("Ethereum","hour","gdax")
#    #
#    #####################
#    litcoin_curr_gdax= get_price("Litcoin","gdax")
#    litcoin_month_gdax= get_price("Litcoin","month","gdax")
#    Process.sleep(1100)
#    litcoin_week_gdax= get_price("Litcoin","week","gdax")
#    litcoin_day_gdax= get_price("Litcoin","day","gdax")
#    litcoin_hour_gdax= get_price("Litcoin","hour","gdax")
#    ########################################
#    Process.sleep(1100)
#    cash_curr_gdax= get_price("Cash","gdax")
#    cash_month_gdax= get_price("Cash","month","gdax")
#
#    Process.sleep(1100)
#    cash_week_gdax= get_price("Cash","week","gdax")
#    cash_day_gdax= get_price("Cash","day","gdax")
#    cash_hour_gdax= get_price("Cash","hour","gdax")

    state = %{
      ### bitcoin data
      bitcoin_curr_coinbase: get_price("Bitcoin","coinbase"),
      bitcoin_month_coinbase: get_price("Bitcoin","month","coinbase"),
      bitcoin_week_coinbase: get_price("Bitcoin","week","coinbase"),
      bitcoin_day_coinbase: get_price("Bitcoin","day","coinbase"),
      bitcoin_hour_coinbase: get_price("Bitcoin","hour","coinbase"),
      bitcoin_year_coinbase: get_price("Bitcoin","year","coinbase"),
#      bitcoin_curr_gdax: bitcoin_curr_gdax,
#      bitcoin_month_gdax: bitcoin_month_gdax,
#      bitcoin_week_gdax: bitcoin_week_gdax,
#      bitcoin_day_gdax: bitcoin_day_gdax,
#      bitcoin_hour_gdax: bitcoin_hour_gdax,
      #
      #      ### ethereum data
      ethereum_curr_coinbase: get_price("Ethereum","coinbase"),
      ethereum_month_coinbase: get_price("Ethereum","month","coinbase"),
      ethereum_week_coinbase: get_price("Ethereum","week","coinbase"),
      ethereum_day_coinbase: get_price("Ethereum","day","coinbase"),
      ethereum_hour_coinbase: get_price("Ethereum","hour","coinbase"),
      ethereum_year_coinbase: get_price("Ethereum","year","coinbase"),
#      ethereum_curr_gdax: ethereum_curr_gdax,
#      ethereum_month_gdax: ethereum_month_gdax,
#      ethereum_week_gdax: ethereum_week_gdax,
#      ethereum_day_gdax: ethereum_day_gdax,
#      ethereum_hour_gdax: ethereum_hour_gdax,
      #
      #      ### litcoin data
      litcoin_curr_coinbase: get_price("Litcoin","coinbase"),
      litcoin_month_coinbase: get_price("Litcoin","month","coinbase"),
      litcoin_week_coinbase: get_price("Litcoin","week","coinbase"),
      litcoin_day_coinbase: get_price("Litcoin","day","coinbase"),
      litcoin_hour_coinbase: get_price("Litcoin","hour","coinbase"),
      litcoin_year_coinbase: get_price("Litcoin","year","coinbase"),
#      litcoin_curr_gdax: litcoin_curr_gdax,
#      litcoin_month_gdax: litcoin_month_gdax,
#      litcoin_week_gdax: litcoin_week_gdax,
#      litcoin_day_gdax: litcoin_day_gdax,
#      litcoin_hour_gdax: litcoin_hour_gdax,
#      #
      #      ### cash data
      cash_curr_coinbase: get_price("Cash","coinbase"),
      cash_month_coinbase: get_price("Cash","month","coinbase"),
      cash_week_coinbase: get_price("Cash","week","coinbase"),
      cash_day_coinbase: get_price("Cash","day","coinbase"),
      cash_hour_coinbase: get_price("Cash","hour","coinbase"),
      cash_year_coinbase: get_price("Cash","year","coinbase"),
#        cash_curr_gdax: cash_curr_gdax,
#        cash_month_gdax: cash_month_gdax,
#        cash_week_gdax: cash_week_gdax,
#        cash_day_gdax: cash_day_gdax,
#        cash_hour_gdax: cash_hour_gdax,


    }

    broadcast state
   # IO.inspect state

    schedule_timer(1_000)
    {:noreply, ""}
  end

  defp schedule_timer(interval) do
    Process.send_after self(), :update, interval
  end


  defp broadcast(state) do

    IO.inspect "tick tock... tick tock"


    CoinbaseWeb.Endpoint.broadcast! "rooms:lobby", "new_state", state


  end


end

