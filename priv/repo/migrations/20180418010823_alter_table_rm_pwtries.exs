defmodule Coinbase.Repo.Migrations.AlterTableRmPwtries do
  use Ecto.Migration

  def change do
    alter table(:users) do
       remove :pw_tries
  end
end
end
