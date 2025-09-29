import { createConnection } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = params;
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
