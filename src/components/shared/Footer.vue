<script setup lang="ts">
import { AiFillLinkedin, AiOutlineMail } from "vue-icons-plus/ai";
import { BsTelephone } from "vue-icons-plus/bs";
</script>

<template>
    <footer
        class="bg-slate-900 text-slate-400 py-7 px-6 lg:px-20 border-t border-slate-800"
    >
        <div
            class="max-w-7xl mx-auto border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4"
        >
            <p>© 2024 CWF Inc. All rights reserved.</p>
            <div class="flex items-center gap-6">
                <a class="hover:text-white" href="#"
                    ><span class="material-symbols-outlined"
                        ><AiFillLinkedin /></span
                ></a>
                <a class="hover:text-white" href="#"
                    ><span class="material-symbols-outlined"
                        ><AiOutlineMail /></span
                ></a>
                <a class="hover:text-white" href="#"
                    ><span class="material-symbols-outlined"
                        ><BsTelephone /></span
                ></a>
            </div>
        </div>
    </footer>
</template>
