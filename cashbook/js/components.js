//组件
'use strict'
/*
 * 每日收支信息-组件
 */
Vue.component('c-day-item', {
    template: `
		<li class="m-day_item">
			<header>
				<div class="u-date">
					<span>1月{{idate}}日 星期{{dayitem[0].w}}</span>
				</div>
				<div class="u-pay_day">
					<span>收支：{{payDay}}</span>
				</div>
			</header>
			<ul>
				<li 
					is="c-item" 
					v-for="payitem in dayitem"
					v-bind:payitem="payitem"
					v-on:deletitem="deletitem"
				></li>
			</ul>
		</li>
	`,
    props: {
        idate: Number,
        dayitem: Array
    },
    computed: {
        payDay() {
            var pd = 0;
            this.dayitem.map(function(item) {
                pd += -item.o + item.i
            })
            return pd
        }
    },
    methods: {
        //接收到数据，直接作为参数
        deletitem(id) {
            console.log(2, id);
            //向上一级父组件传递数据
            this.$emit('deletitem', id)
        }
    }
});

/*
 * 每条收支信息-组件
 */
Vue.component('c-item', {
    template: `
		<li class="u-item" v-bind:data-id="payitem.id" v-on:click="deletitem(payitem.id)">
			<div class="u-category">{{payitem.c}}</div>
			<div class="u-item_info">
				<div class="u-name">
					<span>{{payitem.t}}</span>
				</div>
				<div class="u-pay_item">
					<span>{{payitem.i - payitem.o}}</span>
				</div>
			</div>
		</li>
	`,
    props: ['payitem'],
    methods: {
        //删除点击的信息
        deletitem(id) {
            console.log(1, id);
            //向上一级父组件传递数据
            this.$emit('deletitem', id)
        }

    }
});

//添加记账弹框
Vue.component('c-plusbox', {
    template: `
		
	`
})