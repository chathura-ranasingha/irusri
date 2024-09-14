import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import { RootState } from "../app/store";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "../features/todoSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TodoRedux: React.FC = () => {
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const todos = useSelector((state: any) => state.todo.todos);
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editTodo, setEditTodo] = useState({ title: "", description: "" });

  const handleAddTodo = () => {
    if (newTodo.title.trim() && newTodo.description.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo({ title: "", description: "" });
    }
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleEditTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo({
      ...editTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (todo: TodoItem) => {
    setEditMode(todo.id);
    setEditTodo({ title: todo.title, description: todo.description });
  };

  const handleUpdateTodo = (id: string) => {
    if (editTodo.title.trim() && editTodo.description.trim()) {
      dispatch(updateTodo({ id, ...editTodo }));
      setEditMode(null);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditTodo({ title: "", description: "" });
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          {currentUser && (
            <Typography variant="h6">Welcome: {currentUser.email}</Typography>
          )}
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#f4f4f9",
          p: 3,
          borderRadius: 2,
          mt: 5,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "2px solid #FF6347",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#333" }}
        >
          Todo-List
        </Typography>

        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            label="Title"
            variant="outlined"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            sx={{ bgcolor: "#fff", mr: 1 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
            sx={{ bgcolor: "#fff", mr: 1 }}
          />
          <IconButton
            color="primary"
            onClick={handleAddTodo}
            sx={{ bgcolor: "#FFA500", ml: 1 }}
          >
            <AddIcon />
          </IconButton>
        </Box>

        <List>
          {todos.map((todo: TodoItem) => (
            <ListItem
              key={todo.id}
              sx={{
                bgcolor: "#2E2E2E",
                mb: 1,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Checkbox */}
              <Checkbox
                checked={todo.completed}
                onClick={() => handleToggleTodo(todo.id)}
                sx={{ color: "#FF6347" }}
              />

              {editMode === todo.id ? (
                <Box sx={{ flexGrow: 1, ml: 2 }}>
                  <TextField
                    name="title"
                    value={editTodo.title}
                    onChange={handleEditTodoChange}
                    sx={{ bgcolor: "#fff", mr: 1, width: "300px" }}
                  />
                  <TextField
                    name="description"
                    value={editTodo.description}
                    onChange={handleEditTodoChange}
                    sx={{ bgcolor: "#fff", mr: 1, width: "300px" }}
                  />
                  <IconButton
                    onClick={() => handleUpdateTodo(todo.id)}
                    sx={{ color: "#4CAF50", ml: 1 }}
                  >
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleCancelEdit}
                    sx={{ color: "#FF6347", ml: 1 }}
                  >
                    <CancelIcon />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <Box sx={{ flexGrow: 1, ml: 2 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: todo.completed ? "#9E9E9E" : "white",
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: todo.completed ? "#B0B0B0" : "#ccc",
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {todo.description}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => handleEditClick(todo)}
                    sx={{ color: "#FFD700", ml: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteTodo(todo.id)}
                    sx={{ color: "#FF4500", ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default TodoRedux;
