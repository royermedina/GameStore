<script>
    export default {
        name: 'Galeria',
        props: {
            title: {
                type: String,
                required: true,
            },
            images: {
                type: Array,
                default: () => [],
            }
        }
    }
</script>

<template>
    <div class="container mt-4">
        <h1 class="text-center mb-4">{{ title }}</h1>
        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            <div v-for="(image, index) in images" :key="index" class="col">
                <div class="card h-100">
                    <img :src="image" class="card-img-top" :alt="'Imagen ' + (index + 1)">
                    <div class="card-body">
                        <h5 class="card-title">Imagen {{ index + 1 }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>