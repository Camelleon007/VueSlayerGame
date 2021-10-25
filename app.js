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
      monsterBarColor: "#00a876",
      playerBarColor: "#00a876",
      logs: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        this.monsterHealth = 0;
      }
      if (this.monsterHealth < 30) {
        this.monsterBarColor = "red";
      } else if (this.monsterHealth < 60) {
        this.monsterBarColor = "orange";
      }

      return {
        width: this.monsterHealth + "%",
        backgroundColor: this.monsterBarColor,
      };
    },

    playerBarStyles() {
      if (this.playerHealth < 30) {
        this.playerBarColor = "red";
      } else if (this.playerHealth < 60) {
        this.playerBarColor = "orange";
      }

      return {
        width: this.playerHealth + "%",
        backgroundColor: this.playerBarColor,
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
      const damageValue = randomValue(14, 7);
      this.monsterHealth -= damageValue;
      this.logAction("Player attacks - " + damageValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const damageValue = randomValue(18, 13);
      if (this.playerHealth - damageValue < 0) {
        this.playerHealth = 0;
      } else {
        this.playerHealth -= damageValue;
      }
      this.logAction("Monster attacks - " + damageValue);
    },
    specialAttack() {
      this.currentRound++;
      const damageValue = randomValue(25, 15);
      this.monsterHealth -= damageValue;
      this.logAction("Player uses special attack - " + damageValue);
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
      this.logAction("Player heals + " + healValue);
      this.attackPlayer();
    },
    newGame() {
      this.currentRound = 0;
      this.winner = null;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.monsterBarColor = "#00a876";
      this.playerBarColor = "#00a876";
      this.logs = [];
    },
    surrender() {
      this.winner = "monster";
    },
    logAction(action) {
      console.log(action);
      this.logs.unshift(action);
    },
  },
});

app.mount("#game");
