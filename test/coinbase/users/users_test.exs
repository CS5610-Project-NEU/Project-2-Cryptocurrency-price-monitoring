defmodule Coinbase.UsersTest do
  use Coinbase.DataCase

  alias Coinbase.Users

  describe "users" do
    alias Coinbase.Users.User

    @valid_attrs %{email: "some email", money: 120.5, name: "some name", password_hash: "some password_hash", pw_last_try: "2010-04-17 14:00:00.000000Z", pw_tries: 42}
    @update_attrs %{email: "some updated email", money: 456.7, name: "some updated name", password_hash: "some updated password_hash", pw_last_try: "2011-05-18 15:01:01.000000Z", pw_tries: 43}
    @invalid_attrs %{email: nil, money: nil, name: nil, password_hash: nil, pw_last_try: nil, pw_tries: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Users.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Users.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Users.create_user(@valid_attrs)
      assert user.email == "some email"
      assert user.money == 120.5
      assert user.name == "some name"
      assert user.password_hash == "some password_hash"
      assert user.pw_last_try == DateTime.from_naive!(~N[2010-04-17 14:00:00.000000Z], "Etc/UTC")
      assert user.pw_tries == 42
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Users.update_user(user, @update_attrs)
      assert %User{} = user
      assert user.email == "some updated email"
      assert user.money == 456.7
      assert user.name == "some updated name"
      assert user.password_hash == "some updated password_hash"
      assert user.pw_last_try == DateTime.from_naive!(~N[2011-05-18 15:01:01.000000Z], "Etc/UTC")
      assert user.pw_tries == 43
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Users.change_user(user)
    end
  end
end
