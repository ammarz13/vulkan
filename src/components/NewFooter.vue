<template>
  <footer>
    <div class="container footer-wrap">
      <div class="row">
        <div
          class="col-md-6 col-sm-8 d-inline-flex align-items-center justify-content-sm-start mb-res justify-content-center"
        >
          <p class="mb-0">@ 2022 vulkcan All rights reserved</p>
          <a href="https://twitter.com/MetarunGame" target="_blank">
            <font-awesome-icon icon="fab fa-twitter" />
          </a>
          <a href="https://discord.com/invite/metarungame" target="_blank">
            <font-awesome-icon icon="fab fa-discord" />
          </a>
        </div>
        <div class="col-md-6 col-sm-4">
          <div class="d-flex justify-content-sm-end justify-content-center">
            <span class="night-icon">
              <svg
                width="24"
                height="24"
                fill="#3772FF"
                data-v-0d40bcf7=""
                data-v-d2768648=""
              >
                <path
                  d="M10.404.012c.858-.172 1.507.763 1.046 1.507-2.376 3.838-1.8 8.93 1.444 12.254 2.484 2.395 5.925 3.403 9.34 2.833a1 1 0 0 1 1.033 1.483c-.416.727-1.023 1.473-1.76 2.21a12.05 12.05 0 0 1-17.014 0c-4.69-4.69-4.69-12.324-.022-16.99l.272-.28A11.077 11.077 0 0 1 10.404.012zM8.69 2.67l-.22.106A9.19 9.19 0 0 0 5.908 4.7l-.21.216a10.05 10.05 0 0 0 .209 13.97 10.05 10.05 0 0 0 14.186 0l.123-.127-.212-.002a12.762 12.762 0 0 1-8.248-3.3l-.273-.256C8.2 11.816 7.187 6.95 8.665 2.737l.024-.068zm13.69.237c.94-.778 2.242.58 1.327 1.494l-.116.128c-.892 1.084-.853 3.488.116 4.457l.08.087c.778.94-.58 2.242-1.493 1.327l-.128-.116c-1.084-.892-3.488-.853-4.457.116l-.087.08c-.94.778-2.242-.58-1.327-1.494l.116-.128c.892-1.084.853-3.488-.116-4.457l-.08-.087c-.778-.94.58-2.242 1.494-1.327l.128.116c1.084.892 3.488.853 4.457-.116zM21.032 5.66l-.142.023a6.58 6.58 0 0 1-1.78 0l-.143-.023.023.144a6.58 6.58 0 0 1 0 1.78l-.023.143.143-.022a6.58 6.58 0 0 1 1.78 0l.142.022L21 7.582a6.58 6.58 0 0 1 0-1.78l.022-.144z"
                  data-v-0d40bcf7=""
                ></path>
              </svg>
            </span>
            <div class="">
              <input
                @change="toggleTheme"
                id="checkbox"
                type="checkbox"
                class="switch-checkbox"
              />
              <label for="checkbox" class="switch-label">
                <div
                  class="switch-toggle"
                  :class="{
                    'switch-toggle-checked': userTheme === 'dark-theme',
                  }"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "NewFooter",
  mounted() {
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);
  },
  data() {
    return {
      userTheme: "dark-theme",
    };
  },
  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "dark-theme") {
        this.setTheme("light-theme");
      } else {
        this.setTheme("dark-theme");
      }
    },

    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "light-theme";
      } else {
        return "dark-theme";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  border-top: 1px solid #e6e8ec;
  margin: 24px 40px 0px;
  font-size: 12px;
}
.footer-wrap {
  padding-top: 32px;
  padding-bottom: 32px;
  p {
    color: #777e90;
    margin-right: 24px;
  }
  a {
    margin-right: 20px;
    color: #ffffff;
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
.night-icon {
  width: 24px;
  height: 24px;
  display: flex;
  margin-right: 25px;
}

.switch-checkbox {
  display: none;
}

.switch-label {
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 24px;
  position: relative;
  transition: all 0.25s ease 0s;
  justify-content: space-between;
  width: 64px;
  border-radius: 16px;
  z-index: 1;
}

.switch-toggle {
  position: absolute;
  background: #3772ff;
  transition: all 0.25s ease 0s;
  top: 50%;
}
.mb-res {
  @media screen and (max-width: 575px) {
    margin-bottom: 10px;
  }
}
</style>
