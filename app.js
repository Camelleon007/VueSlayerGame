function randomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
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
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //player lost
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      this.monsterHealth -= randomValue(12, 7);
      this.attackPlayer();
    },
    attackPlayer() {
      const damageValue = randomValue(18, 13);
      if (this.playerHealth - damageValue < 0) {
        this.playerHealth = 0;
      } else {
        this.playerHealth -= damageValue;
      }
    },
    specialAttack() {
      this.currentRound++;
      this.monsterHealth -= randomValue(25, 15);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = randomValue(20, 10);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
  },
});

app.mount("#game");
