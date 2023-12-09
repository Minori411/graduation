﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Fullstack_Minori.Migrations
{
    public partial class message : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Users",
                newName: "PK");

            migrationBuilder.RenameColumn(
                name: "task",
                table: "Contents",
                newName: "Task");

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    text = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.RenameColumn(
                name: "PK",
                table: "Users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "Task",
                table: "Contents",
                newName: "task");
        }
    }
}
