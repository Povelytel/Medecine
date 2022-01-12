<template>
  <header>
    <nav>
      <div>
        <router-link to="/">
          <img src="@/assets/menu/home.png" alt="home icon" />
          <img
            class="active-img"
            src="@/assets/menu/home_blue.png"
            alt="home icon"
          />
        </router-link>
        <router-link to="/ui-component">
          <img src="@/assets/menu/menu.png" alt="home icon" />
          <img
            class="active-img"
            src="@/assets/menu/menu_blue.png"
            alt="home icon"
          />
        </router-link>
        <router-link to="/profile">
          <img src="@/assets/menu/profile.png" alt="home icon" />
          <img
            class="active-img"
            src="@/assets/menu/profile_blue.png"
            alt="home icon"
          />
        </router-link>
      </div>
    </nav>
    <div id="logo">
      <img src="@/assets/logo-square.png" alt />
      Hospital site
    </div>
  </header>
</template>
