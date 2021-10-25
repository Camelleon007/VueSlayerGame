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
      currentRound: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      return {
        width: this.monsterHealth + "%",
      };
    },
    playerBarStyles() {
      return {
        width: this.playerHealth + "%",
      };
    },
    specialAttackAvailable() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      this.monsterHealth -= damageValue(12);
      this.attackPlayer();
    },
    attackPlayer() {
      this.playerHealth -= damageValue(18);
    },
    specialAttack() {
      this.currentRound++;
      this.monsterHealth -= damageValue(25);
      this.attackPlayer();
    },
  },
});

app.mount("#game");
