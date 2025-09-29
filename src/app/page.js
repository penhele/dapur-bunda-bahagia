"use client";

import { useEffect, useState } from "react";

export default function MyComponents() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/menus");
        const response = await data.json();
        setMenus(response.menus);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <div></div>;
}
