export const WeatherInfoCard = ({ data }) => {
  const tableData = data.map((item) => {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th className="table-date" colSpan="2">
                {" "}
                Date: {item.date}{" "}
              </th>
            </tr>
            <tr>
              <th className="table-temp" colSpan="2">
                {" "}
                Temperature{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-temp">
              <td>Min</td>
              <td>{item.min}</td>
            </tr>
            <tr className="table-temp">
              <td>Max</td>
              <td>{item.max}</td>
            </tr>
            <tr>
              <td>Pressure</td>
              <td>{item.pressure}</td>
            </tr>
            <tr>
              <td>Humidity</td>
              <td>{item.humidity}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  });

  return <div className="weather-table">{tableData}</div>;
};
