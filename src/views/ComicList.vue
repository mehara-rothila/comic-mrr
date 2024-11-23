<template>
    <div>
      <h1>Comic List</h1>
      <div class="comic-container">
        <div v-for="comic in comics" :key="comic.id" class="comic-card">
          <img :src="comic.image" alt="Comic Cover" class="comic-image" />
          <h2>{{ comic.title }}</h2>
          <p>{{ comic.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ComicList",
    data() {
      return {
        comics: [
          {
            id: 1,
            title: "Spider-Man",
            description: "The adventures of Spider-Man in New York City.",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 2,
            title: "Batman",
            description: "The Dark Knight fights crime in Gotham City.",
            image: "https://via.placeholder.com/150",
          },
          {
            id: 3,
            title: "Superman",
            description: "The story of the Man of Steel, protector of Metropolis.",
            image: "https://via.placeholder.com/150",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .comic-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }
  
  .comic-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 200px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .comic-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  h2 {
    font-size: 1.2rem;
    margin: 10px 0;
  }
  
  p {
    font-size: 0.9rem;
    color: #555;
  }
  </style>
  