import EventForm from "./EventForm";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = ({ handleSubmit, events }) => {
  const navigate = useNavigate();
  const onSubmit = (data) => {
    handleSubmit(data);
    navigate("..");
  };
  const params = useParams();
  const eventId = parseInt(params.id, 10);
  const event = events.find((e) => e.id === eventId);
  if (event) {
    return (
      <EventForm
        id={event.id}
        name={event.name}
        date={event.date}
        description={event.description}
        category={event.category}
        handleSubmit={onSubmit}
      />
    );
  }
  return <div>Event not found</div>;
};

export default EditEvent;
