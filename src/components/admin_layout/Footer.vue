<template>
  <footer>
    <section class="footer-content">
      <figure class="logo">
        <img src="@/assets/logo.png" alt="logo" />
        <figcaption>slogan</figcaption>
      </figure>
    </section>
    <hr />
    <section class="socials">
      <address class="social-link">
        <a href="#" title="Facebook"><font-awesome-icon icon="fa-brands fa-facebook-f" /></a>
      </address>
      <address class="social-link">
        <a href="#" title="Twitter"><font-awesome-icon icon="fa-brands fa-twitter" /></a>
      </address>
      <address class="social-link">
        <a href="#" title="Youtube"><font-awesome-icon icon="fa-brands fa-youtube" /></a>
      </address>
    </section>
    <small class="text-reduced">© Copyright All rights reserved</small>
  </footer>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  name: 'Footer',
  props: {
    message: String,
  },
  setup(props) {
    const axios: any = inject('axios') // inject axios
    console.log(props.message) // <-- type: string
    const book: Book = reactive({ title: 'Vue 3 Guide' })

    const getList = (): void => {
      axios.get('').then((response: { data: any }) => {
        console.log(response.data)
      })
    }

    getList()

    return { getList }
  },
})
</script>

<style scoped lang="scss">
footer {
  font-size: 150%;
  width: 100%;
  background-color: $gray;
  color: $white;
  padding: 1rem 4rem;
  box-sizing: border-box;
  .text-reduced {
    font-size: 60%;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    padding: 0 1rem;

    .logo {
      margin: 0;
    }
  }

  .socials {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    margin-bottom: 0.5rem;
    .social-link {
      width: 2em;
      height: 2em;
      border-radius: 100%;
      border: 2px solid $white;
      user-select: none;

      a {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        text-decoration: none;
        font-style: normal;
        font-size: 1.2em;
        color: $white;
      }
    }
  }

  & > hr {
    margin: 1.5rem 0 2.5rem 0;
    height: 2px;
    background-color: $white;
    border: none;
  }

  @media only screen and (max-width: 600px) {
  }
}
</style>
