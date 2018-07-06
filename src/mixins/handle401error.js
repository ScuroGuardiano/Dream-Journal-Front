export default {
    methods: {
        handle401Error(err) {
            this.$store.dispatch('logOut');
            this.$router.push('/login');
        }
    }
}
