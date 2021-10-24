function damageValue(strength) {
  return (
    Math.floor(Math.random() * (strength - (strength - 7))) + (strength - 7)
  );
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
    };
  },
  methods: {
    attackMonster() {
      this.monsterHealth -= damageValue(12);
      this.attackPlayer();
    },
    attackPlayer() {
      this.playerHealth -= damageValue(18);
    },
  },
});

app.mount("#game");
