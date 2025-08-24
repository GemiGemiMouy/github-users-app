import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Alert } from "@mui/material";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import { User } from "../types/User";
import logo from "../assets/logo.jpg";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const token = process.env.REACT_APP_GITHUB_TOKEN;
  const config = token ? { headers: { Authorization: `token ${token}` } } : {};

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError("");

        // 1️⃣ Fetch popular users with followers > 1000
        const res = await axios.get(
          "https://api.github.com/search/users?q=followers:>1000&per_page=25",
          config
        );
        const basicUsers = res.data.items;

        // 2️⃣ Fetch detailed info for each user
        const detailedUsers: User[] = await Promise.all(
          basicUsers.map(async (u: any) => {
            const details = await axios.get(`https://api.github.com/users/${u.login}`, config);
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
        setError("Failed to fetch GitHub users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  // Filter users by name or company
  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredUsers(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(lower) ||
          (u.company && u.company.toLowerCase().includes(lower))
      )
    );
  }, [search, users]);

  return (
    <Container sx={{ py: 4 }}>
      <img
        src={logo}
        alt="Logo"
        style={{ height: 60, margin: "1rem auto", display: "block" }}
      />
      <Typography
  variant="h4"
  gutterBottom
  align="center"
  sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
>
        GitHub Users
      </Typography>

      <SearchBar value={search} onChange={setSearch} placeholder="Search by name or company..." />

      {error && <Alert severity="error">{error}</Alert>}

      {/* Total Users */}
  <Typography variant="subtitle1"  sx={{ fontFamily:"'Poppins', sans-serif",fontWeight:600, mb: 0,mt:2  }}>
    Total Users: {filteredUsers.length}
  </Typography>

      <Grid container spacing={3} mt={1}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
