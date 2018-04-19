defmodule Coinbase.Coins do
  @moduledoc """
  The Coins context.
  """

  import Ecto.Query, warn: false
  alias Coinbase.Repo

  alias Coinbase.Coins.Coin
  alias Coinbase.Coins.Coin_alert

  @doc """
  Returns the list of coins.

  ## Examples

      iex> list_coins()
      [%Coin{}, ...]

  """
  def list_coins do
    Repo.all(Coin)
  end

  @doc """
  Gets a single coin.

  Raises `Ecto.NoResultsError` if the Coin does not exist.

  ## Examples

      iex> get_coin!(123)
      %Coin{}

      iex> get_coin!(456)
      ** (Ecto.NoResultsError)

  """
  def get_coin!(id), do: Repo.get!(Coin, id)

  @doc """
  Creates a coin.

  ## Examples

      iex> create_coin(%{field: value})
      {:ok, %Coin{}}

      iex> create_coin(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_coin(attrs \\ %{}) do
    %Coin{}
    |> Coin.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a coin.

  ## Examples

      iex> update_coin(coin, %{field: new_value})
      {:ok, %Coin{}}

      iex> update_coin(coin, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_coin(%Coin{} = coin, attrs) do
    coin
    |> Coin.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Coin.

  ## Examples

      iex> delete_coin(coin)
      {:ok, %Coin{}}

      iex> delete_coin(coin)
      {:error, %Ecto.Changeset{}}

  """
  def delete_coin(%Coin{} = coin) do
    Repo.delete(coin)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking coin changes.

  ## Examples

      iex> change_coin(coin)
      %Ecto.Changeset{source: %Coin{}}

  """
  def change_coin(%Coin{} = coin) do
    Coin.changeset(coin, %{})
  end

  alias Coinbase.Coins.Coin_purchase

  @doc """
  Returns the list of coin_purchase.

  ## Examples

      iex> list_coin_purchase()
      [%Coin_purchase{}, ...]

  """
  def list_coin_purchase do
    Repo.all(Coin_purchase)
  end

  def list_coin_purchase_by_user(user_id) do
    query = from p in Coin_purchase,
      where: p.user_id == ^user_id,
    preload: [:coin]
    Enum.map(Repo.all(query), fn(x) -> %{amount: x.amount, name: x.coin.name} end)
  end

  @doc """
  Gets a single coin_purchase.

  Raises `Ecto.NoResultsError` if the Coin purchase does not exist.

  ## Examples

      iex> get_coin_purchase!(123)
      %Coin_purchase{}

      iex> get_coin_purchase!(456)
      ** (Ecto.NoResultsError)

  """
  def get_coin_purchase!(id), do: Repo.get!(Coin_purchase, id)


  def get_coin_purchase(user_id, coin_id) do
    Repo.get_by(Coin_purchase,%{user_id: user_id, coin_id: coin_id})
  end
  @doc """
  Creates a coin_purchase.

  ## Examples

      iex> create_coin_purchase(%{field: value})
      {:ok, %Coin_purchase{}}

      iex> create_coin_purchase(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """

  def delete_alert(user_id, coin_id) do
    query = from a in Coin_alert,
      where: a.user_id == ^user_id and a.coin_id == ^coin_id
    Repo.delete_all(query)
  end
  def create_coin_purchase(attrs \\ %{}) do
    %Coin_purchase{}
    |> Coin_purchase.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a coin_purchase.

  ## Examples

      iex> update_coin_purchase(coin_purchase, %{field: new_value})
      {:ok, %Coin_purchase{}}

      iex> update_coin_purchase(coin_purchase, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_coin_purchase(%Coin_purchase{} = coin_purchase, attrs) do
    coin_purchase
    |> Coin_purchase.changeset(attrs)
    |> Repo.update()
  end

  def update_coin_amount(%Coin_purchase{} = coin_purchase, amount) do
    coin_purchase
    |> Coin_purchase.changeset(%{amount: coin_purchase.amount + amount })
    |> Repo.update()

  end

  @doc """
  Deletes a Coin_purchase.

  ## Examples

      iex> delete_coin_purchase(coin_purchase)
      {:ok, %Coin_purchase{}}

      iex> delete_coin_purchase(coin_purchase)
      {:error, %Ecto.Changeset{}}

  """
  def delete_coin_purchase(%Coin_purchase{} = coin_purchase) do
    Repo.delete(coin_purchase)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking coin_purchase changes.

  ## Examples

      iex> change_coin_purchase(coin_purchase)
      %Ecto.Changeset{source: %Coin_purchase{}}

  """
  def change_coin_purchase(%Coin_purchase{} = coin_purchase) do
    Coin_purchase.changeset(coin_purchase, %{})
  end

  @doc """
  Returns the list of coin_alert.

  ## Examples

      iex> list_coin_alert()
      [%Coin_alert{}, ...]

  """
  def list_coin_alert do
    Repo.all(Coin_alert)
  end


  def list_alert_by_user(user_id) do
    query = from p in Coin_alert,
      where: p.user_id == ^user_id and p.above >= 0,
      preload: [:coin]
    Enum.map(Repo.all(query), fn(x) -> %{amount: x.amount, name: x.coin.name, above: x.above} end)
  end
  @doc """
  Gets a single coin_alert.

  Raises `Ecto.NoResultsError` if the Coin alert does not exist.

  ## Examples

      iex> get_coin_alert!(123)
      %Coin_alert{}

      iex> get_coin_alert!(456)
      ** (Ecto.NoResultsError)

  """
  def get_coin_alert!(id), do: Repo.get!(Coin_alert, id)

  @doc """
  Creates a coin_alert.

  ## Examples

      iex> create_coin_alert(%{field: value})
      {:ok, %Coin_alert{}}

      iex> create_coin_alert(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_coin_alert(attrs \\ %{}) do
    %Coin_alert{}
    |> Coin_alert.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a coin_alert.

  ## Examples

      iex> update_coin_alert(coin_alert, %{field: new_value})
      {:ok, %Coin_alert{}}

      iex> update_coin_alert(coin_alert, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_coin_alert(%Coin_alert{} = coin_alert, attrs) do
    coin_alert
    |> Coin_alert.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Coin_alert.

  ## Examples

      iex> delete_coin_alert(coin_alert)
      {:ok, %Coin_alert{}}

      iex> delete_coin_alert(coin_alert)
      {:error, %Ecto.Changeset{}}

  """
  def delete_coin_alert(%Coin_alert{} = coin_alert) do
    Repo.delete(coin_alert)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking coin_alert changes.

  ## Examples

      iex> change_coin_alert(coin_alert)
      %Ecto.Changeset{source: %Coin_alert{}}

  """
  def change_coin_alert(%Coin_alert{} = coin_alert) do
    Coin_alert.changeset(coin_alert, %{})
  end

  def get_coin_alert_by_params(attrs) do
    Repo.get_by(Coin_alert, %{user_id: attrs["user_id"], coin_id: attrs["coin_id"], above: attrs["above"]})
  end
end
