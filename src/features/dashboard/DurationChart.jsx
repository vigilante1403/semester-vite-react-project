import styled from "styled-components";
import Heading from "../../ui/Heading";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "Asia",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "South America",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "Europe",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "Africa",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "North America",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "Antarctica",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "Oceania",
    value: 0,
    color: "#3b82f6",
  }
  // ,
  // {
  //   duration: "21+ nights",
  //   value: 0,
  //   color: "#a855f7",
  // },
];

const startDataDark = [
  {
    duration: "Asia",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "South America",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "Europe",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "Africa",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "North America",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "Antarctica",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "Oceania",
    value: 0,
    color: "#1d4ed8",
  }
  // ,
  // {
  //   duration: "21+ nights",
  //   value: 0,
  //   color: "#7e22ce",
  // },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.region;
      if (num === 'Asia' ) return incArrayValue(arr, "Asia");
      if (num === 'South America') return incArrayValue(arr, "South America");
      if (num === 'Europe') return incArrayValue(arr, "Europe");
      if (num==='Africa') return incArrayValue(arr, "Africa");
      if (num==='North America') return incArrayValue(arr, "North America");
      if (num==='Antarctica') return incArrayValue(arr, "Antarctica");
      if (num==='Oceania') return incArrayValue(arr, "Oceania");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}
function DurationChart({confirmedStays}) {
  const {isDarkMode}=useDarkMode()
  const startData=isDarkMode?startDataDark:startDataLight
  const data = prepareData(startData,confirmedStays)
  return (
    <ChartBox>
      <Heading as='h2'>Total tours summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} innerRadius={70} outerRadius={90} nameKey='duration' dataKey='value'
          cx="45%"
          cy="50%"
          paddingAngle={2}
           >
            {startDataLight.map(entry=><Cell fill={entry.color} stroke={entry.color} key={entry.duration} />)}
           </Pie>
           <Tooltip/>
           <Legend verticalAlign="middle" align="right" width="30%" layout="vertical" iconSize={10} iconType="circle"/>
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  )
}

export default DurationChart
