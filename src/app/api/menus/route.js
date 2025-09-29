import { createConnection } from "../../../../lib/db";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM menus";
    const [menus] = await db.query(sql);

    return NextResponse.json({ menus: menus });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch menus", details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { name, description, price, category } = await request.json();
    const db = await createConnection();

    const menu_id = randomUUID();

    const sql = `
      INSERT INTO menus (menu_id, name, description, price, category) VALUES (?, ?, ?, ?, ?)
    `;

    const values = [menu_id, name, description, price, category];

    await db.query(sql, values);

    return NextResponse.json(
      { message: "Menu added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/menus error:", error);

    return NextResponse.json(
      { error: "Failed to add menu", details: error.message },
      { status: 500 },
    );
  }
}
