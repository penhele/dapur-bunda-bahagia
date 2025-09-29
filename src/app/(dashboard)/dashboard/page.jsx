"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IoPencil } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AdminPage() {
  const [menus, setMenus] = useState([]);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMenuId, setEditingMenuId] = useState(null);

  const categories = ["nasi", "mi", "cemilan", "minuman"];

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch("/api/menus");
      const data = await res.json();
      setMenus(data.menus);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMenu = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMenu),
      });

      if (!res.ok) throw new Error("Failed to add menu");

      setNewMenu({ name: "", description: "", price: "", category: "" });
      setIsDialogOpen(false);
      fetchMenus();
    } catch (error) {
      console.error("Add menu error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/menus/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete menu");

      fetchMenus();
    } catch (error) {
      console.error("Delete menu error", error);
    }
  };

  const handleEditClick = (menu) => {
    setIsEditMode(true);
    setEditingMenuId(menu.menu_id);
    setNewMenu({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      category: menu.category,
    });
    setIsDialogOpen(true);
  };

  const handleUpdateMenu = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/menus/${editingMenuId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenu),
    });
    if (!res.ok) throw new Error("Failed to update menu");

    // Tutup dialog dan reset state
    setIsDialogOpen(false);
    setIsEditMode(false);
    setEditingMenuId(null);
    setNewMenu({ name: "", description: "", price: "", category: "" });

    fetchMenus();
  };

  return (
    <div className="p-5">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="flex justify-start">
            <DialogTrigger asChild>
              <Button
                type="button"
                className="inline-flex w-auto self-start"
                onClick={() => {
                  setIsEditMode(false);
                  setNewMenu({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                  });
                }}
              >
                Add Menu
              </Button>
            </DialogTrigger>
          </div>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Edit Menu" : "Add New Menu"}
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={isEditMode ? handleUpdateMenu : handleAddMenu}
              className="space-y-3"
            >
              {" "}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newMenu.name}
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newMenu.description}
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  value={newMenu.price}
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Category</label>

                <Select
                  value={newMenu.category}
                  onValueChange={(value) =>
                    setNewMenu({ ...newMenu, category: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="nasi">Nasi</SelectItem>
                    <SelectItem value="mi">Mi</SelectItem>
                    <SelectItem value="kudapan">Kudapan</SelectItem>
                    <SelectItem value="minuman">Minuman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {menus.map((menu) => (
              <TableRow key={menu.menu_id}>
                <TableCell>{menu.name}</TableCell>
                <TableCell className="max-w-[250px] overflow-x-auto whitespace-nowrap">
                  <div className="w-max">{menu.description}</div>
                </TableCell>
                <TableCell>{menu.price}</TableCell>
                <TableCell>{menu.category}</TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleEditClick(menu)}
                      className="hover:text-yellow-400"
                    >
                      <IoPencil size={16} />
                    </button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="hover:text-red-400">
                          <FaRegTrashAlt size={16} />
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete and remove the menu.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(menu.menu_id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AdminPage;
