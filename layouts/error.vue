<script>

    export default {
        layout: 'simple',
        props: ['error'],
        methods: {
            tt(val) {
                return val;
            },
        }
    };
</script>

<template>
    <div class="main-content--error">
        <div class="error__container u-container u-section">
            <div class="error__inner">
                <h1 class="error__title u-h1">{{ tt('Error', 'error.title-error') }} {{ error.statusCode }}</h1>
                <p class="error__description" v-if="error.statusCode === 404">{{ tt('We couldn\'t find the page you\'re looking for.', 'error.message-404') }}</p>
                <p class="error__description" v-else-if="error.statusCode === 504" v-html="tt('Request failed with status code 504. <br> Gateway time-out.', 'error.message-504')"></p>
                <p class="error__description" v-else-if="error.statusCode === 503" v-html="tt('The webpage is currently unavailable. <br> It may be overloaded or down for maintenance.', 'error.message-503')"></p>
                <p class="error__description" v-else-if="error.message === 'Network Error'">{{ tt('Network Error', 'error.message-network') }}</p>
                <p class="error__description" v-else>{{ error.message }}</p>
                <p><a class="error__link link--default" href="/">{{ tt('Return to main page', 'error.return-link') }}</a></p>

                <img class="error__image" src="/img/error-404.png" srcset="/img/error-404@2x.png 2x" alt="" role="presentation">
            </div>
        </div>
    </div>
</template>
