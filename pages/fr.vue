<script>
    export default {
        nuxtI18n: false,
        layout: 'simple',
        beforeMount() {
            window.location.href = '/?1';
        }
    }
</script>

<template>
    <main class="u-container">
        <section class=" u-section">
            <h1 class="u-h2 u-text-center">Redirecting...</h1>
        </section>
    </main>
</template>
