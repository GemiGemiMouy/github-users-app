import React from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Stack,
  Chip,
  Link,
  Tooltip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import PeopleIcon from "@mui/icons-material/People";
import { User } from "../types/User";

interface Props {
  user: User;
}

const popularCompanies = [
  "Google",
  "Facebook",
  "Meta",
  "Microsoft",
  "Apple",
  "Amazon",
  "Netflix",
  "Tesla",
];

const UserCard: React.FC<Props> = ({ user }) => {
  const isPopularCompany = user.company
    ? popularCompanies.some((c) =>
        user.company?.toLowerCase().includes(c.toLowerCase())
      )
    : false;

  return (
    <Card
      sx={{
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 340,
        transition: "all 0.3s ease",
        boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Avatar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Avatar
          src={user.avatar_url}
          alt={user.name}
          sx={{
            width: 96,
            height: 96,
            border: "3px solid #48c55bff", // Indigo accent
            boxShadow: "0 4px 10px rgba(99,102,241,0.2)",
          }}
        />
      </Box>

      {/* Name & Company */}
      <CardContent sx={{ textAlign: "center", pt: 2, pb: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
        >
          {user.name || user.login}
        </Typography>

        {user.company && (
          <Chip
            label={user.company}
            color={isPopularCompany ? "primary" : "default"}
            size="small"
            sx={{
              mt: 1,
              fontSize: "0.75rem",
              fontWeight: 500,
              borderRadius: "8px",
            }}
          />
        )}

        {/* Followers / Following */}
        <Stack direction="row" spacing={3} justifyContent="center" mt={2}>
          <Tooltip title="Followers" arrow>
            <Link
              href={`${user.html_url}?tab=followers`}
              target="_blank"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.primary",
                fontWeight: 500,
                "&:hover": { color: "#5ea815" },
              }}
            >
              <PeopleIcon fontSize="small" sx={{ mr: 0.5 }} /> {user.followers}
            </Link>
          </Tooltip>

          <Tooltip title="Following" arrow>
            <Link
              href={`${user.html_url}?tab=following`}
              target="_blank"
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.primary",
                fontWeight: 500,
                "&:hover": { color: "#5ea815" },
              }}
            >
              <PeopleIcon fontSize="small" sx={{ mr: 0.5 }} /> {user.following}
            </Link>
          </Tooltip>
        </Stack>
      </CardContent>

      {/* GitHub Button */}
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Link
          href={user.html_url}
          target="_blank"
          underline="none"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #5ea815",
            borderRadius: "12px",
            px: 3,
            py: 0.8,
            fontWeight: 600,
            fontSize: "0.9rem",
            color: "#5ea815",
            fontFamily: "Poppins, sans-serif",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#5ea815",
              color: "#fff",
              transform: "scale(1.05)",
            },
          }}
        >
          <GitHubIcon fontSize="small" sx={{ mr: 1 }} />
          GitHub
        </Link>
      </Box>
    </Card>
  );
};

export default UserCard;
