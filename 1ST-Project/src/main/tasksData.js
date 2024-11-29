const tasksData = [
  { title: "Comprar", deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), description: "Tomate, Lechuga, Queso, Leche", status: "Pending", showDetails: false },
  { title: "Viajes", deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), description: "Alemania, Turquía, Lisboa, Qatar, Reino Unido", status: "Completed", showDetails: false },
  { title: "Renovar papeles", deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), description: "Pedir cita, pagar renovación", status: "Pending", showDetails: false },
];

export default tasksData;