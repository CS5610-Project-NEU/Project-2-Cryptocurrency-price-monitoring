defmodule Coinbase.CoinsTest do
  use Coinbase.DataCase

  alias Coinbase.Coins

  describe "coins" do
    alias Coinbase.Coins.Coin

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def coin_fixture(attrs \\ %{}) do
      {:ok, coin} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Coins.create_coin()

      coin
    end

    test "list_coins/0 returns all coins" do
      coin = coin_fixture()
      assert Coins.list_coins() == [coin]
    end

    test "get_coin!/1 returns the coin with given id" do
      coin = coin_fixture()
      assert Coins.get_coin!(coin.id) == coin
    end

    test "create_coin/1 with valid data creates a coin" do
      assert {:ok, %Coin{} = coin} = Coins.create_coin(@valid_attrs)
      assert coin.name == "some name"
    end

    test "create_coin/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Coins.create_coin(@invalid_attrs)
    end

    test "update_coin/2 with valid data updates the coin" do
      coin = coin_fixture()
      assert {:ok, coin} = Coins.update_coin(coin, @update_attrs)
      assert %Coin{} = coin
      assert coin.name == "some updated name"
    end

    test "update_coin/2 with invalid data returns error changeset" do
      coin = coin_fixture()
      assert {:error, %Ecto.Changeset{}} = Coins.update_coin(coin, @invalid_attrs)
      assert coin == Coins.get_coin!(coin.id)
    end

    test "delete_coin/1 deletes the coin" do
      coin = coin_fixture()
      assert {:ok, %Coin{}} = Coins.delete_coin(coin)
      assert_raise Ecto.NoResultsError, fn -> Coins.get_coin!(coin.id) end
    end

    test "change_coin/1 returns a coin changeset" do
      coin = coin_fixture()
      assert %Ecto.Changeset{} = Coins.change_coin(coin)
    end
  end

  describe "coin_purchase" do
    alias Coinbase.Coins.Coin_purchase

    @valid_attrs %{amount: 42}
    @update_attrs %{amount: 43}
    @invalid_attrs %{amount: nil}

    def coin_purchase_fixture(attrs \\ %{}) do
      {:ok, coin_purchase} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Coins.create_coin_purchase()

      coin_purchase
    end

    test "list_coin_purchase/0 returns all coin_purchase" do
      coin_purchase = coin_purchase_fixture()
      assert Coins.list_coin_purchase() == [coin_purchase]
    end

    test "get_coin_purchase!/1 returns the coin_purchase with given id" do
      coin_purchase = coin_purchase_fixture()
      assert Coins.get_coin_purchase!(coin_purchase.id) == coin_purchase
    end

    test "create_coin_purchase/1 with valid data creates a coin_purchase" do
      assert {:ok, %Coin_purchase{} = coin_purchase} = Coins.create_coin_purchase(@valid_attrs)
      assert coin_purchase.amount == 42
    end

    test "create_coin_purchase/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Coins.create_coin_purchase(@invalid_attrs)
    end

    test "update_coin_purchase/2 with valid data updates the coin_purchase" do
      coin_purchase = coin_purchase_fixture()
      assert {:ok, coin_purchase} = Coins.update_coin_purchase(coin_purchase, @update_attrs)
      assert %Coin_purchase{} = coin_purchase
      assert coin_purchase.amount == 43
    end

    test "update_coin_purchase/2 with invalid data returns error changeset" do
      coin_purchase = coin_purchase_fixture()
      assert {:error, %Ecto.Changeset{}} = Coins.update_coin_purchase(coin_purchase, @invalid_attrs)
      assert coin_purchase == Coins.get_coin_purchase!(coin_purchase.id)
    end

    test "delete_coin_purchase/1 deletes the coin_purchase" do
      coin_purchase = coin_purchase_fixture()
      assert {:ok, %Coin_purchase{}} = Coins.delete_coin_purchase(coin_purchase)
      assert_raise Ecto.NoResultsError, fn -> Coins.get_coin_purchase!(coin_purchase.id) end
    end

    test "change_coin_purchase/1 returns a coin_purchase changeset" do
      coin_purchase = coin_purchase_fixture()
      assert %Ecto.Changeset{} = Coins.change_coin_purchase(coin_purchase)
    end
  end

  describe "coin_alert" do
    alias Coinbase.Coins.Coin_alert

    @valid_attrs %{amount: 120.5}
    @update_attrs %{amount: 456.7}
    @invalid_attrs %{amount: nil}

    def coin_alert_fixture(attrs \\ %{}) do
      {:ok, coin_alert} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Coins.create_coin_alert()

      coin_alert
    end

    test "list_coin_alert/0 returns all coin_alert" do
      coin_alert = coin_alert_fixture()
      assert Coins.list_coin_alert() == [coin_alert]
    end

    test "get_coin_alert!/1 returns the coin_alert with given id" do
      coin_alert = coin_alert_fixture()
      assert Coins.get_coin_alert!(coin_alert.id) == coin_alert
    end

    test "create_coin_alert/1 with valid data creates a coin_alert" do
      assert {:ok, %Coin_alert{} = coin_alert} = Coins.create_coin_alert(@valid_attrs)
      assert coin_alert.amount == 120.5
    end

    test "create_coin_alert/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Coins.create_coin_alert(@invalid_attrs)
    end

    test "update_coin_alert/2 with valid data updates the coin_alert" do
      coin_alert = coin_alert_fixture()
      assert {:ok, coin_alert} = Coins.update_coin_alert(coin_alert, @update_attrs)
      assert %Coin_alert{} = coin_alert
      assert coin_alert.amount == 456.7
    end

    test "update_coin_alert/2 with invalid data returns error changeset" do
      coin_alert = coin_alert_fixture()
      assert {:error, %Ecto.Changeset{}} = Coins.update_coin_alert(coin_alert, @invalid_attrs)
      assert coin_alert == Coins.get_coin_alert!(coin_alert.id)
    end

    test "delete_coin_alert/1 deletes the coin_alert" do
      coin_alert = coin_alert_fixture()
      assert {:ok, %Coin_alert{}} = Coins.delete_coin_alert(coin_alert)
      assert_raise Ecto.NoResultsError, fn -> Coins.get_coin_alert!(coin_alert.id) end
    end

    test "change_coin_alert/1 returns a coin_alert changeset" do
      coin_alert = coin_alert_fixture()
      assert %Ecto.Changeset{} = Coins.change_coin_alert(coin_alert)
    end
  end
end
