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
  const [positions, setPostions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/job/${localStorage.getItem("email")}`)
      .then((res) => {
        // console.log(res.data.listOfJobs);
        setPostions(
          res.data.listOfJobs.map((e) => {
            return { ...e, applications: [] };
          })
        );
      });
  }, []);

  useEffect(() => {
    // applicationsByPosition.length === positions.length && positions.length !== 0
    //   null
    //   :
    if (positions?.length) {
      positions.map((job) => {
        axios
          .get(`http://localhost:5000/job/applications/${job._id}`)
          .then((res) => {
            setPostions((prev) => {
              return prev.map((e) =>
                e._id === job._id
                  ? {
                      ...e,
                      applications:
                        res.status == 200 ? res.data.applicationToThisJob : [],
                    }
                  : e
              );
            });
          });
      });
    }
  }, [positions.length]);

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
    labels: positions.map((post) => post?.title),
    datasets: [
      {
        label: "Total rejected",

        data: positions.map((e) =>
          e.applications.length
            ? e.applications.filter(
                (application) => application.status === "rejected"
              ).length
            : 0
        ),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Total accepted",

        data: positions.map((e) =>
          e.applications.length
            ? e.applications.filter(
                (application) => application.status === "accepted"
              ).length
            : 0
        ),
        backgroundColor: "rgba(0, 255, 0, 0.5)",
      },
      {
        label: "Total applications",
        data: positions.map((e) => e.applications.length),
        backgroundColor: " rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  console.log(positions);
  return (
    <div className="container">
      <div style={{ width: "1200px", height: "500px" }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
