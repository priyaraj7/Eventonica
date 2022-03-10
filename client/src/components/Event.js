import React, { useState } from "react";
import AddEvent from "./AddEvent";
import DeleteEvent from "./DeleteEvent";
import FindEvent from "./FindEvent";

const Event = () => {
  const mockEvents = [
    {
      id: "1",
      name: "Birthday",
      date: "2021-09-01",
      description: "A birthday party for my best friend",
      category: "Celebration",
    },

    {
      id: "2",
      name: "Graduation",
      date: "2021-08-01",
      description: "The class of 2021 graduates from East High",
      category: "Education",
    },

    {
      id: "3",
      name: "JS Study Session",
      date: "2021-10-01",
      description: "A chance to practice Javascript interview questions",
      category: "Education",
    },
  ];

  const renderHeader = () => {
    let headerElement = ["ID", "NAME", "DATE", "DESCRIPTION", "CATEGORY"];

    return headerElement.map((header, index) => {
      return <th key={index}>{header}</th>;
    });
  };

  const renderBody = () => {
    return events.map((eve, i) => {
      return (
        <tr key={i}>
          <td>{eve.id}</td>
          <td>{eve.name}</td>
          <td>{eve.date}</td>
          <td>{eve.description}</td>
          <td>{eve.category}</td>

          {/* <td className="opration">
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </td> */}
        </tr>
      );
    });
  };

  const [events, setEvents] = useState(mockEvents);

  const handleAddEventOnSubmit = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <section className="event-management">
      <h2>Event Management</h2>
      <div>
        <h3>All Events</h3>

        <table id="events-list">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
        <AddEvent onAdd={handleAddEventOnSubmit} />
        <DeleteEvent />
        <FindEvent />
      </div>
    </section>
  );
};

export default Event;
