import request from './http.js' //引入http.js
const api = request
export default {
	//登陆
	login:{
		// 登陆接口
		login:(data)=>{
				return api.request('/api/login', data) 
		},
		// 退出登录
		logout:(data)=>{
			return api.request('/api/logout', data) 
		}
	},
	//首页
	index:{
		//获取菜单
		GetSystemMenu:()=>{
			  return api.request('/auth/mobile-menu/get-system-menu');
		},
	},
	//人资
	hr:{
		//人事档案录入
		profiling:{
			//获取部门
			getDept:()=>{return api.request('/mobile/hr/profiling/get-dept')},
			//添加用户
			addUser:(FormData)=>{return api.request('/mobile/hr/profiling/add-user',FormData)},
			//获取企业微信打卡规则
			Getcorpcheckinoption:()=>{return api.request('/mobile/hr/profiling/getcorpcheckinoption')},
			//百度卡证识别
			getOrc:(data)=>{return api.request('/mobile/hr/profiling/get-baidu-orc',data)}
		},
	},
	//生产
	production:{
		// 刷卡报工
		report:{
			// 流转卡扫码获取数据
			getInfo:(data)=>{
				return api.request('/production/report/get-info',data)
			},
			// 流转工序详细信息
			getProcessAssignInfo:(data)=>{
				return api.request('/production/report/get-process-assign-info',data)
			},
			//报工
			saveCompleteQty:(data)=>{
				return api.request('/production/report/save-complete-qty',data)
			}
			
		}
	},
	// 报表类
	report:{
		//业务日报表
		dailyStatement:{
			 //获取列表
			  GetMobileList:(data)=>{
				  return api.request('/trade/daily/get-mobile-list',data)
			  },
			 //获取汇报人员
			 GetReportUser:(data)=>{
				 return api.request('/trade/daily/get-report-user',data)
			 }
			  
		},
		production:{
			//排产计划
			schedule:{
				GetList:(search)=>{
					 return api.request('/production/schedule/get-list',search)
				}
			}
		},
		//财务报表
		finance:{
			//出纳余额表
			teller:{
				GetList:(search)=>{
					 return api.request('/production/schedule/get-list',search)
				}
			},
			//现金流量项目表
			cashFlow:{
				GetList:(search)=>{
					 return api.request('/mobile-report/cash-flow/get-list',search)
				}
			},
			//流贷到期还款明细
			recycling:{
				GetList:(search)=>{
					 return api.request('/mobile-report/recycling/get-list',search)
				}
			}
		},
		//人资报表
		hr:{
		   // 招聘工作记录
			RecruitmentReport:{
				//获取汇总数据
				GetStatList:(search)=>{
					 return api.request('/hr/recruitment-report/get-stat-list',search)
				},
				//详细页数据
				GetStatDetailList:(search)=>{
					 return api.request('/hr/recruitment-report/get-stat-detail-list',search)
				},		
		   },
	     //招聘沟通记录管理
	        CandidateContact:{
			   //获取统计列表(手机端)
			   GetStatList:(search)=>{
				    return api.request('/hr/candidate-contact/get-stat-list',search)
			   },
			   //获取统计明细(手机端)
			   GetStatDetail:(search)=>{
				   return api.request('/hr/candidate-contact/get-stat-detail',search)
			   },
			   //获取招聘人员列表
			   GetRecruiterList:(search)=>{
			   	 return api.request('/hr/candidate-contact/get-recruiter-list',search)
			   },
			   //获取应聘者列表
			   GetCandidateList:(search)=>{
			   	 return api.request('/hr/candidate-contact/get-candidate-list',search)
			   },
			   //获取应聘者信息
			   GetCandidateDetail:(search)=>{
				    return api.request('/hr/candidate-contact/get-candidate-detail',search)
			   },
			   // 获取招聘人员统计列表按月(手机端)
			   GetRecruiterStatList:(search)=>{
			   		return api.request('/hr/candidate-contact/get-recruiter-stat-list',search)
			   },
			   //获取招聘人员沟通列表
			   GetRecruiterContactList:(search)=>{
				   return api.request('/hr/candidate-contact/get-recruiter-contact-list',search)
			   }
		   },
	       //招聘计划
	       RecruitmentPlan:{
			   // 获取手机报表列表
			   GetMobileList:(search)=>{
				   return api.request('/hr/recruitment-plan/get-mobile-list',search)
			   }
		   }
		},
	//门店报表
	shop:{
			 //应收汇总表
			 GetList:(search)=>{
			 	return api.request('/mobile-report/shop/receivable/get-list',search)
			 },
			 //租金走势表
			 getTrend:(search)=>{
				 return api.request('/mobile-report/shop/receivable/get-trend',search)
			 }
		 },
	// 仓储报表
	store:{
		    //成品入库
			storageGetList:(search)=>{
				return api.request('/mobile-report/store/storage/get-list',search)
			},
	  },
	// 包装报表
	pack:{
		//包装计划
		getPackTask:(search)=>{
			return api.request('/production/pack-task/get-list',search)
		}
	}
	}
	//外贸部日报表
	
	
}