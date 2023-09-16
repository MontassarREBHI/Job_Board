import { Position } from "../types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EmployerGraphs() {
  const [positions, setPostions] = useState<Position[]>([]);
  const [applicationsByPosition, setApplicantionsByPosition] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/job/${localStorage.getItem("email")}`)
      .then((res) => {
        console.log(res.data.listOfJobs);
        setPostions(res.data.listOfJobs);
      });
  }, []);

  useEffect(() => {
    positions?.map((job) => {
      axios
        .get(`http://localhost:5000/job/applications/${job._id}`)
        .then((res) =>
          setApplicantionsByPosition((prev) => [
            ...prev,
            res.data.applicationToThisJob,
          ])
        );
    });
  }, [positions]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Applications graph by position",
      },
    },
  };

  const data = {
    labels: positions.map((post) => post.title),
    datasets: [
      {
        label: "Total rejected",
        data: [1, 5, 6, 7, 8],
        //  applicationsByPosition.map(
        //   (e) =>
        //     e.filter((application) => application.status === "rejected").length
        // ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Total accepted",
        data: [1, 5, 6, 7, 8],
        // applicationsByPosition.map(
        //   (e) =>
        //     e.filter((application) => application.status === "accepted").length
        // ),
        backgroundColor: "rgba(0, 255, 0, 0.5) ",
      },
      {
        label: "Total applications",
        data: applicationsByPosition.map((e) => e.length),
        backgroundColor: " rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="container" style={{ width: "1200px", height: "500px" }}>
      <Bar options={options} data={data} />
    </div>
  );
}
