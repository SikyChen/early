'use strict'

let now = new Date(),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate(),
    w = now.getDay();



let vm = new Vue({
    el: '#app',
    data: {
        //从本地存储中获取数据
        data: JSON.parse(localStorage.getItem('data') || '[]'),
        year: y,
        month: m,
        date: d,
        day: w,
        //添加支出信息的弹窗
        outbox: false,
        itemcategory: [],
        itemtitle: '',
        itempay: '',
        itempayerror: false,
        //添加收入信息的弹窗
        inbox: false,
        itemincategory: '收',
        itemin: '',
        //修改信息的弹窗
        changebox: false,
        changeitemid: undefined
    },
    watch: {
        data: function() {
            localStorage.setItem('data', JSON.stringify(this.data));
        }
    },
    computed: {
        //当月所有收支信息条目
        monthItems() {
            let arr = [],
                _this = this;
            this.data.map(function(item) {
                if (item.y === _this.year && item.m === _this.month)
                    arr.push(item)
            })
            return arr;
        },
        //当月收支总和
        allInOut() {
            let allIn = 0,
                allOut = 0;
            this.monthItems.map(function(item) {
                allIn += item.i;
                allOut += item.o;
            })
            return {
                allIn: allIn,
                allOut: allOut
            }
        },
        //当月有收支信息的日期
        monthDays() {
            let arr = [],
                m = this.monthItems;
            for (let i = 0, j = m.length; i < j; i++) {
                if (arr.indexOf(m[i].d) === -1) {
                    arr.push(m[i].d)
                }
            }
            return arr;
        }
    },
    methods: {
        //转到上一个月
        trunLastMonth() {
            if (this.month > 1) {
                this.month--;
            } else {
                this.month = 12;
                this.year--;
            }
        },
        //转到下一个月
        trunNextMonth() {
            if (this.month < 12) {
                this.month++;
            } else {
                this.month = 1;
                this.year++;
            }
        },
        returnCurrentMonth() {
            this.year = y;
            this.month = m;
        },
        //从id的时间戳获取时间
        getTheDate(time) {
            return new Date(time)
        },
        //某一天的收支信息
        dayItems(d) {
            let arr = [],
                m = this.monthItems;
            m.map(function(item) {
                item.d === d && arr.push(item)
            })
            return arr
        },
        //添加收支弹窗 是否显示
        addBoxFun(inout) {
            if (inout === 'inbox') {
                this.inbox = this.inbox ? false : true
            } else if (inout === 'outbox') {
                this.outbox = this.outbox ? false : true
            } else {
                this.outbox = false;
                this.inbox = false;
                this.changebox = false;
            }
            //若弹窗关闭，则置空输入框内容
            if (!this.outbox && !this.inbox) {
                this.itemcategory = [];
                this.itemtitle = '';
                this.itempay = '';
                this.itemin = '';
                this.itempayerror = false
            }
        },
        //点击收支弹窗确定 添加信息到data
        //第一个参数，区分是收入还是支出的信息
        addItemFun(inout) {
            if (this.itemcategory.length != 0 &&
                this.itemtitle &&
                this.itempay || this.itemin
            ) {
                var time = new Date();
                this.data.unshift({
                    id: time.getTime(),
                    y: time.getFullYear(),
                    m: time.getMonth() + 1,
                    d: time.getDate(),
                    w: time.getDay(),
                    c: this.itemcategory,
                    t: this.itemtitle,
                    o: Number(this.itempay),
                    i: Number(this.itemin)
                });
                // localStorage.setItem('data', JSON.stringify(this.data));
                this.addBoxFun();
                this.returnCurrentMonth();
            } else {
                console.log('请完整填写信息且金额必须是不为0的数字')
                this.itempayerror = true
            }
        },
        //信息菜单的弹窗，接收到的数据，作为参数id
        changeitembox(id) {
            this.changebox = true;
            this.changeitemid = id;
        },
        //删除条目
        deletItemFun() {
            console.log(3, this.changeitemid)
            let _this = this;
            this.data.map(function(item, index) {
                if (item.id === _this.changeitemid) {
                    _this.data.splice(index, 1);
                }
            });
            // localStorage.setItem('data', JSON.stringify(this.data));
            this.changebox = false;
        },
        //修改信息的弹窗
        changeItemFun() {
            if (this.itemcategory.length != 0 &&
                this.itemtitle &&
                this.itempay || this.itemin
            ) {
                let _this = this;
                this.data.map(function(item, index) {
                    if (item.id === _this.changeitemid) {
                        let itemIndex = index;
                    }
                });
                this.data[itemIndex].c = this.itemcategory;
                this.data[itemIndex].t = this.itemtitle;
                this.data[itemIndex].o = Number(this.itempay);
                this.data[itemIndex].i = Number(this.itemin);
                // localStorage.setItem('data', JSON.stringify(this.data));
                this.addBoxFun();
            } else {
                console.log('请完整填写信息且金额必须是不为0的数字')
                this.itempayerror = true
            }
        }

    }
})