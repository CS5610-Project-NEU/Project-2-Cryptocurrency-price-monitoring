defmodule CoinbaseWeb.RoomsChannel do
  use CoinbaseWeb, :channel

  import Coinbase.CoinbaseApi



  def join("rooms:lobby", payload, socket) do
      IO.inspect "dasdas"
      {:ok, socket}

  end

  def handle_in("new_state", state, socket) do
    IO.inspect state
    IO.inspect "new state state state"
    broadcast! socket, "new_state", state
    {:noreply, socket}
  end

#  def handle_in("new_time", msg, socket) do
#    IO.inspect msg
#    IO.inspect "new time time tiemeeeeeewrwer"
#
#  end

  def handle_in("new_time", msg, socket) do
    IO.inspect "new time time tiemeeeeeewrwer"
    push socket, "new_time", msg
    {:noreply, socket}
  end


  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (rooms:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
