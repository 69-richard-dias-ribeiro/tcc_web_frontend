<script>
    
export default {
   props: {
     type: {
       type: String,
       required: true
     },
     data: {
       type: Object,
       required: true
     },
     options: {
       type: Object,
       default () {
         return {}
       },
     },
     plugins: {
       type: Array,
       default () {
         return []
       }
     }
   }

}
</script>