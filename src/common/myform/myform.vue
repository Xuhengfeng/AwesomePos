<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="客户姓名">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="订单时间">
            <Row>
                <Col span="11">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem.date"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <TimePicker type="time" placeholder="选择时间" v-model="formItem.time"></TimePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="生成订单号">
            <Input v-model="formItem.input" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="描述">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </FormItem>  
    </Form>
</template>

<script type="text/ecmascript-6">
	export default {
        data () {
            return {
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
            }
        }
    }
</script>

<style lang="scss">

</style>