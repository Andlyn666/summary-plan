import React, { useState } from 'react';
import { Button, Spin, Select, Input, Card } from 'antd';

const JDForm = () => {
  const [job, setJob] = useState('开发人员');
  const [description, setDescription] = useState('开发商业智能软件');
  const [outputFormat, setOutputFormat] = useState('总结');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setIsLanguage] = useState("中文");

  function onClickGenerate() {
    setIsLoading(true);
    const inputText = `一位岗位为${job}的员工需要写一份${language}的${outputFormat},请帮助它完成，并按照以下内容为基础：${description}`;
    const key = process.env.REACT_APP_OPENAI_KEY;
    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
            prompt: inputText,
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 800
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setOutput(data.choices[0].text);
        setIsLoading(false);
    });
  }

  return (
    <form style={{textAlign:'left'}}>
      <label className = "Common-style" htmlFor="job-select">选择您的职业</label>
      <br/>
      <Select id="job-select" className = "Common-style, Select-style" value={job} onChange={(e) => setJob(e)}>
        <Select.Option value="开发人员">开发人员</Select.Option>
        <Select.Option value="猎头顾问">猎头顾问</Select.Option>
        <Select.Option value="设计师">设计师</Select.Option>
        <Select.Option value="产品经理">产品经理</Select.Option>
        <Select.Option value="销售代表">销售代表</Select.Option>
        <Select.Option value="市场专员">市场专员</Select.Option>
        <Select.Option value="客服代表">客服代表</Select.Option>
        <Select.Option value="金融分析师">金融分析师</Select.Option>
        <Select.Option value="人力资源专员">人力资源专员</Select.Option>
        <Select.Option value="项目经理">项目经理</Select.Option>
        <Select.Option value="IT支持专员">IT支持专员</Select.Option>
        <Select.Option value="会计">会计</Select.Option>
        <Select.Option value="行政助理">行政助理</Select.Option>
        <Select.Option value="教师">教师</Select.Option>
        <Select.Option value="护士">护士</Select.Option>
        <Select.Option value="软件工程师">软件工程师</Select.Option>
        <Select.Option value="警察">警察</Select.Option>
        <Select.Option value="律师">律师</Select.Option>
        <Select.Option value="工程师">工程师</Select.Option>
        <Select.Option value="医生">医生</Select.Option>
        <Select.Option value="科学家">科学家</Select.Option>
        <Select.Option value="建筑师">建筑师</Select.Option>
        <Select.Option value="市场经理">市场经理</Select.Option>
        <Select.Option value="运营经理">运营经理</Select.Option>
        <Select.Option value="IT经理">IT经理</Select.Option>
        <Select.Option value="人力资源经理">人力资源经理</Select.Option>
        <Select.Option value="财务经理">财务经理</Select.Option>
        <Select.Option value="公共关系专员">公共关系专员</Select.Option>
        <Select.Option value="物流协调员">物流协调员</Select.Option>
        <Select.Option value="建筑工人">建筑工人</Select.Option>
        <Select.Option value="厨师">厨师</Select.Option>
        <Select.Option value="公务员">公务员</Select.Option>
        <Select.Option value="飞行员">飞行员</Select.Option>
        <Select.Option value="研究员">研究员</Select.Option>
        <Select.Option value="摄影师">摄影师</Select.Option>
        <Select.Option value="运动员">运动员</Select.Option>
        <Select.Option value="保险代理人">保险代理人</Select.Option>
        <Select.Option value="房地产经纪人">房地产经纪人</Select.Option>
        <Select.Option value="旅行社代理">旅行社</Select.Option>
        <Select.Option value="理发师">理发师</Select.Option>
        <Select.Option value="化妆师">化妆师</Select.Option>
      </Select>
      <br />
      <label htmlFor="output-format" className = "Common-style">想生成哪种文本呢？</label>
      <br/>
      <Select id="output-format" className = "Common-style, Select-style" value={outputFormat} onChange={(e)=>{setOutputFormat(e)}}>
        <Select.Option value="总结">总结</Select.Option>
        <Select.Option value="计划">计划</Select.Option>
        <Select.Option value="PPT大纲">PPT大纲</Select.Option>
        <Select.Option value="文案">文案</Select.Option>
        <Select.Option value="代码">代码</Select.Option>
      </Select>
      <br />
      <label className = "Common-style" htmlFor="job-description">请描述一下想要生成的内容（尽量详细）</label>
      <br/>
      <Input.TextArea id="job-description" className = "Common-style" value={description} 
        autoSize={{ minRows: 3, maxRows: 6 }} onChange={(e) => setDescription(e.target.value)} />
      <br />
      <Button className = "Common-style" style = {{background: 'gray'}} type="primary" disabled={isLoading} value="生成结果" onClick={onClickGenerate} >生成结果</Button>
      <br />
      <div className = "Common-style">
        <Spin size="large" spinning={isLoading}>
            <Card style = {{whiteSpace: 'pre-wrap'}}>
                {output}
            </Card>
        </Spin>
      </div>
      
    </form>
  );
};

export default JDForm;