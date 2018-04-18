defmodule Coinbase.Repo.Migrations.AlterTableRmPwlasttry do
  use Ecto.Migration

  def change do
    alter table(:users) do
       remove :pw_last_try
  end
end
end
