import {useState} from "react";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingTrainingIndex = trainings.findIndex((t) => t.date === date);

    if (existingTrainingIndex !== -1) {
      const updatedTrainings = [...trainings];
      updatedTrainings[existingTrainingIndex].distance += parseFloat(distance);
      setTrainings(updatedTrainings);
    } else {
      const newTraining = { date, distance: parseFloat(distance) };
      const updatedTrainings = [newTraining, ...trainings];
      updatedTrainings.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTrainings(updatedTrainings);
    }

    setDate('');
    setDistance('');
  };

  const handleDelete = (index) => {
    const updatedTrainings = [...trainings];
    updatedTrainings.splice(index, 1);
    setTrainings(updatedTrainings);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Дата (ДД.ММ.ГГ)
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Пройдено км
          <input className="input" type="number" min="0" step="0.1" value={distance} onChange={(e) => setDistance(e.target.value)} required />
        </label>
        <button className="button" type="submit">ОК</button>
      </form>

      <div>
        <div>
          <ul className="list-header">
            <li>Дата (ДД.ММ.ГГ)</li>
            <li>Пройдено км</li>
            <li>Удалить</li>
          </ul>
        </div>
        <div>
          <ul className="list-body">
            {trainings.map((training, index) => (
              <li className="list-item" key={index}>
                <span className="list-item__date">{training.date}</span>
                <span>{training.distance}</span>
                <button className="list-item__button" onClick={() => handleDelete(index)}>✘</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};