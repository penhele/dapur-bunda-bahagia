import { createConnection } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request, context) {
  const { id } = await context.params;

  try {
    const db = await createConnection();
    const sql = "DELETE FROM menus WHERE menu_id = ?";
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/menus/:id error:", error);
    return NextResponse.json(
      { error: "Failed to delete menu", details: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(request, context) {
  const { id } = await context.params;

  try {
    const { name, description, price, category } = await request.json();
    const db = await createConnection();

    const sql = `
      UPDATE menus
      SET name = ?, description = ?, price = ?, category = ?
      WHERE menu_id = ?
    `;

    const [result] = await db.query(sql, [
      name,
      description,
      price,
      category,
      id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Menu updated successfully" });
  } catch (error) {
    console.error("PUT /api/menus/:id error:", error);
    return NextResponse.json(
      { error: "Failed to update menu", details: error.message },
      { status: 500 },
    );
  }
}
