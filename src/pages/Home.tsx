import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Box,
  AppBar,
  Toolbar,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SearchIcon from "@mui/icons-material/Search";
import UserCard from "../components/UserCard";
import { User } from "../types/User";
import logo from "../assets/logormbg.png";
import SearchBar from "../components/SearchBar";


// Define the sorting options type
type SortOption = "name" | "followers";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const token = process.env.REACT_APP_GITHUB_TOKEN;
  const config = token ? { headers: { Authorization: `token ${token}` } } : {};

  // Fetch GitHub users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://api.github.com/search/users?q=followers:>1500&per_page=25",
          config
        );
        const basicUsers = res.data.items;
        const detailedUsers: User[] = await Promise.all(
          basicUsers.map(async (u: any) => {
            const details = await axios.get(
              `https://api.github.com/users/${u.login}`,
              config
            );
            return {
              id: details.data.id,
              login: details.data.login,
              avatar_url: details.data.avatar_url,
              name: details.data.name || details.data.login,
              company: details.data.company,
              followers: details.data.followers,
              following: details.data.following,
              html_url: details.data.html_url,
            };
          })
        );
        setUsers(detailedUsers);
        setFilteredUsers(detailedUsers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Filter & sort users
  useEffect(() => {
    let filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        (u.company && u.company.toLowerCase().includes(search.toLowerCase()))
    );

    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "followers") {
      filtered.sort((a, b) => b.followers - a.followers);
    }

    setFilteredUsers(filtered);
  }, [search, users, sortBy]);

  // Favorite toggle
  const toggleFavorite = (id: number) => {
    let updated: number[];
    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", color: "#333", pb: 4 }}>
     <AppBar
  position="sticky"
  elevation={0}
  sx={{
    backgroundColor: "#fff",
    color: "#333",
    mb: 4,
    borderBottom: "1px solid #ddd",
    px: { xs: 2, sm: 4 },
    py: 1, // compact padding
  }}
>
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 1,
      minHeight: 64, // compact toolbar height
    }}
  >
    {/* Logo + Title */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          height: 70,   // smaller logo height
          width: "auto",
          objectFit: "contain",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          letterSpacing: 0.5,
          fontSize: { xs: 16, sm: 24 }, // smaller text
           fontFamily: "Poppins, sans-serif",
        }}
      >
        Explore GitHub Users
      </Typography>
    </Box>

    {/* Search + Sort */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1.5,
          py: 0.3,
          borderRadius: 2,
          width: { xs: 250, sm: 300 }, // compact search
          bgcolor: "#f5f5f5",
        }}
      >
        <SearchIcon sx={{ color: "#5ea815", mr: 1 }} />
        <SearchBar
          placeholder="Search by name or company..."
          value={search}
          onChange={setSearch}
        />
      </Paper>

      <FormControl
        size="small"
        sx={{
          minWidth: 140,
          ml: 1,
          bgcolor: "#f5f5f5",
          borderRadius: 2,
        }}
      >
        <InputLabel id="sort-label"></InputLabel>
        <Select
          labelId="sort-label"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 14 }}
        >
          <MenuItem value="name">Name A-Z</MenuItem>
          <MenuItem value="followers">Followers ↓</MenuItem>
        </Select>
      </FormControl>
    </Box>
  </Toolbar>
</AppBar>



      <Container>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Total Users: {filteredUsers.length}
        </Typography>

        {/* Loading shimmer */}
       {loading ? (
  <Grid container spacing={3}>
    {Array.from({ length: 6 }).map((_, idx) => (
      <Grid item xs={12} sm={6} md={4} key={idx}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            height: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
            position: "relative",
            bgcolor: "#e0e0e0",
          }}
          elevation={1}
        >
          {/* Avatar Skeleton */}
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: "#cfcfcf",
              mb: 2,
            }}
          />

          {/* Name Skeleton */}
          <Box sx={{ width: "60%", height: 25, bgcolor: "#cfcfcf", mb: 1, borderRadius: 1 }} />

          {/* Company Skeleton */}
          <Box sx={{ width: "40%", height: 20, bgcolor: "#cfcfcf", mb: 1, borderRadius: 1 }} />

          {/* Followers/Following Skeleton */}
          <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
            <Box sx={{ width: 50, height: 20, bgcolor: "#cfcfcf", borderRadius: 1 }} />
            <Box sx={{ width: 50, height: 20, bgcolor: "#cfcfcf", borderRadius: 1 }} />
          </Box>

          {/* Favorite Icon Skeleton */}
          <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "#cfcfcf" }} />

          {/* Shimmer overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "-150px",
              height: "100%",
              width: "150px",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
              animation: "shimmer 1.5s infinite",
            }}
          />
        </Paper>
      </Grid>
    ))}
  </Grid>
) : filteredUsers.length === 0 ? (
  <Typography>No users found</Typography>
) : (
  <Grid container spacing={3}>
    {filteredUsers.map((user) => (
      <Grid item xs={12} sm={6} md={4} key={user.id}>
        <UserCard user={user}>
          <IconButton onClick={() => toggleFavorite(user.id)}>
            {favorites.includes(user.id) ? <StarIcon color="warning" /> : <StarBorderIcon />}
          </IconButton>
        </UserCard>
      </Grid>
    ))}
  </Grid>
)}

        
      </Container>
    </Box>
  );
};

export default Home;
