import { Avatar, CardActionArea, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { blue, green, orange, purple, red } from "@mui/material/colors";
import { MdOpenInNew } from "react-icons/md";
const SectionCards = () => {
  return (
    <div className="w-full grid grid-cols-5 grid-rows-1 gap-4">
      {/* Users */}
      <Card
        variant="outlined"
        sx={{
          maxWidth: 250,
          p: 0.5,
          borderRadius: 5,
          boxShadow: "inset 0 -20px 35px -10px rgba(0,0,0,0.12)",
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
          }}
          onClick={() => alert("View more clicked")}
        >
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }}>U</Avatar>}
            title="Users"
            sx={{ width: "100%", textAlign: "left" }}
          />
          <CardContent>
            <p>Total: 100k+</p>
            <p>7 days closest: 540</p>
          </CardContent>
        </CardActionArea>
      </Card>
      {/* Seller */}
      <Card
        variant="outlined"
        sx={{
          p: 0.5,
          borderRadius: 5,
          boxShadow: "inset 0 -20px 35px -10px rgba(0,0,0,0.12)",
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
          }}
          onClick={() => alert("View more clicked")}
        >
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: green[500] }}>S</Avatar>}
            title="Sellers"
            sx={{ width: "100%", textAlign: "left" }}
          />
          <CardContent>
            <p>Total: 10k+</p>
            <p>Waiting: 40</p>
          </CardContent>
        </CardActionArea>
      </Card>
      {/* Products */}
      <Card
        variant="outlined"
        sx={{
          p: 0.5,
          borderRadius: 5,
          boxShadow: "inset 0 -20px 35px -10px rgba(0,0,0,0.12)",
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
          }}
          onClick={() => alert("View more clicked")}
        >
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: blue[500] }}>P</Avatar>}
            title="Products"
            sx={{ width: "100%", textAlign: "left" }}
          />
          <CardContent>
            <p>Total: 230k+</p>
            <p>Waiting: 540</p>
          </CardContent>
        </CardActionArea>
      </Card>
      {/* Orders */}
      <Card
        variant="outlined"
        sx={{
          p: 0.5,
          borderRadius: 5,
          boxShadow: "inset 0 -20px 35px -10px rgba(0,0,0,0.12)",
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
          }}
          onClick={() => alert("View more clicked")}
        >
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: orange[500] }}>O</Avatar>}
            title="Orders"
            sx={{ width: "100%", textAlign: "left" }}
          />
          <CardContent>
            <p>Total: 410k+</p>
            <p>Waiting: 540</p>
            <p>Return: 540</p>
          </CardContent>
        </CardActionArea>
      </Card>
      {/* Revenue */}
      <Card
        variant="outlined"
        sx={{
          p: 0.5,
          borderRadius: 5,
          boxShadow: "inset 0 -20px 35px -10px rgba(0,0,0,0.12)",
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
          }}
          onClick={() => alert("View more clicked")}
        >
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: purple[500] }}>R</Avatar>}
            title="Revenue"
            sx={{ width: "100%", textAlign: "left" }}
          />
          <CardContent>
            <p>Today: 23.000k+</p>
            <p>This month: 230.000k</p>
            <p>Total: 230.000k</p>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
export default SectionCards;
