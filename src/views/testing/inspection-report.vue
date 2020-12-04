<template>
  <div class="page-container">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="INSPECTION REPORT" name="first">
          <el-form ref="form" :label-position="labelPosition" :model="listForm">
            <el-row :gutter="8">
              <el-col :xs="24" :sm="24" :lg="8">
                <el-form-item label="FORM M NO.：">{{ listForm.busNO }}</el-form-item>
                <el-form-item label="CSIC REFERENCE NO.(I.O.NO.)：">*******</el-form-item>
                <el-form-item label="INSPECTOR NAME：">KER100049001</el-form-item>
                <el-form-item label="INSPECTION OFFICE：">中地汉盛检验认证</el-form-item>
                <el-form-item label="INSPECTION DATE：">2020-07-09</el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="8">
                <el-form-item label="INSPECTION LOCATION:">{{ listForm.portCode }}</el-form-item>
                <el-form-item label="CONTACT NAME:" />
                <el-form-item label="EXPORTER:">{{ listForm.exportCountry }}</el-form-item>
                <el-form-item label="TELEPHONE NO.:" />
                <el-form-item label="FAX NO.:" />
                <el-form-item label="EXPORT TO:">{{ listForm.exportCountry }}</el-form-item>
                <!--                <el-form-item label=""></el-form-item>-->
              </el-col>
              <el-col :xs="24" :sm="24" :lg="8">
                <el-form-item label="STATE OF GOODS:">
                  <el-checkbox-group v-model="listForm.firstChecked1">
                    <el-checkbox label="NEW" style="margin-bottom: 5px" />
                    <el-checkbox label="USED" style="margin-bottom: 5px" />
                    <el-checkbox label="STOCK LOT" style="margin-bottom: 5px" />
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="SHIPMENT:">
                  <el-checkbox-group v-model="listForm.firstChecked2">
                    <el-checkbox label="AIR" style="margin-bottom: 5px" />
                    <el-checkbox label="SEA" style="margin-bottom: 5px" />
                    <el-checkbox label="OTHER" style="margin-bottom: 5px" />
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="DELIVER:">
                  <el-checkbox-group v-model="listForm.firstChecked3">
                    <el-checkbox label="COMPLETE" style="margin-bottom: 5px" />
                    <el-checkbox label="PARTIAL  OF" style="margin-bottom: 5px" />
                    <el-checkbox label="FINAL" style="margin-bottom: 5px" />
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="COUNTRY OF ORIGIN:">
                  P.R. CHINA
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="200" style="border-top: 1px solid #000000;">
              <el-col :xs="24" :sm="24" :lg="8">
                <el-form-item label="DESCRIPTION OF THE GOODS BY THE  INSPECTOR:">
                  <el-input v-model="listForm.description" type="textarea" :rows="2" placeholder="":autosize="{ minRows: 13, maxRows: 13}" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="16">
                <el-form-item label="INSPECTION RESULT:">
                  <el-radio v-model="listForm.inspectionResult" label="SATISFACTORY">SATISFACTORY</el-radio>
                  <el-radio v-model="listForm.inspectionResult" label="REJECTED">REJECTED</el-radio>
                  <el-radio v-model="listForm.inspectionResult" label="PENDING">PENDING</el-radio>
                  <el-radio v-model="listForm.inspectionResult" label="ABORTED">ABORTED</el-radio>
                </el-form-item>
                <el-row :gutter="8" class="checkStyle">
                  <el-col :xs="24" :sm="24" :lg="8">
                    1.WORKMANSHIP APPEARANCE/FUNCTION
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="16">
                    <el-radio v-model="listForm.appearance" label="CONFORMED">CONFORMED</el-radio>
                    <el-radio v-model="listForm.appearance" label="DISCREPANCY">DISCREPANCY</el-radio>
                    <el-radio v-model="listForm.appearance" label="N/A">N/A</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="8" class="checkStyle">
                  <el-col :xs="24" :sm="24" :lg="8">
                    2.VISUAL INSPECTION
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="16">
                    <el-radio v-model="listForm.visualInspection" label="CONFORMED">CONFORMED</el-radio>
                    <el-radio v-model="listForm.visualInspection" label="DISCREPANCY">DISCREPANCY</el-radio>
                    <el-radio v-model="listForm.visualInspection" label="N/A">N/A</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="8" class="checkStyle">
                  <el-col :xs="24" :sm="24" :lg="8">
                    3.QUANTITY
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="16">
                    <el-radio v-model="listForm.quantity" label="CONFORMED">CONFORMED</el-radio>
                    <el-radio v-model="listForm.quantity" label="DISCREPANCY">DISCREPANCY</el-radio>
                    <el-radio v-model="listForm.quantity" label="N/A">N/A</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="8" class="checkStyle">
                  <el-col :xs="24" :sm="24" :lg="8">
                    4.STORAGE CONDITION/PACKING
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="16">
                    <el-radio v-model="listForm.packing" label="CONFORMED">CONFORMED</el-radio>
                    <el-radio v-model="listForm.packing" label="DISCREPANCY">DISCREPANCY</el-radio>
                    <el-radio v-model="listForm.packing" label="N/A">N/A</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="8" class="checkStyle">
                  <el-col :xs="24" :sm="24" :lg="8">
                    5.MARKING/LABELING
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="16">
                    <el-radio v-model="listForm.labeling" label="CONFORMED">CONFORMED</el-radio>
                    <el-radio v-model="listForm.labeling" label="DISCREPANCY">DISCREPANCY</el-radio>
                    <el-radio v-model="listForm.labeling" label="N/A">N/A</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="8" class="checkStyle">
                  <el-col :xs="24" :sm="24" :lg="8">
                    6.DATA MEASUREMENT/TEST WITNESS
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="16">
                    <el-radio v-model="listForm.witness" label="CONFORMED">CONFORMED</el-radio>
                    <el-radio v-model="listForm.witness" label="DISCREPANCY">DISCREPANCY</el-radio>
                    <el-radio v-model="listForm.witness" label="N/A">N/A</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="8" class="checkStyle">
                  <el-col :xs="24" :sm="24" :lg="8">
                    7.AGE OR SHELF LIFE
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="16">
                    <el-radio v-model="listForm.shelfLife" label="CONFORMED">CONFORMED</el-radio>
                    <el-radio v-model="listForm.shelfLife" label="DISCREPANCY">DISCREPANCY</el-radio>
                    <el-radio v-model="listForm.shelfLife" label="N/A">N/A</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="8" class="checkStyle">
                  <el-col :xs="24" :sm="24" :lg="8">
                    8.LOADING WITNESS
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="16">
                    <el-radio v-model="listForm.loadingWitness" label="CONFORMED">CONFORMED</el-radio>
                    <el-radio v-model="listForm.loadingWitness" label="DISCREPANCY">DISCREPANCY</el-radio>
                    <el-radio v-model="listForm.loadingWitness" label="N/A">N/A</el-radio>>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="border-top: 1px solid #000000;">
              <el-col :xs="24" :sm="24" :lg="12">
                <el-form-item label="SCOPE OF INSPECTION:">
                  <el-radio v-model="listForm.scope" label="RANDOM">RANDOM</el-radio>
                  <el-radio v-model="listForm.scope" label="SAMPLE PLAN">SAMPLE PLAN</el-radio>
                  <el-radio v-model="listForm.scope" label="OTHER">OTHER</el-radio>
                </el-form-item>
                <el-form-item label="PACKAGE NUMBER INSPECTED:">
                  <el-input v-model="listForm.packageNO" type="textarea" :rows="2" placeholder="" :autosize="{ minRows: 4, maxRows: 6}" />
                </el-form-item>
                <el-form-item label="SAMPLING">
                  <el-radio v-model="listForm.isSampling" label="YES">YES NO. OF SAMPLES PICKED OUT</el-radio>
                  <el-radio v-model="listForm.isSampling" label="NO">NO</el-radio>
                </el-form-item>
                <p style="line-height: 36px;font-size: 14px">PACKING & NUMBERS:</p>
                <el-row :gutter="2" style="width: 100%">
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-input v-model="listForm.carton" placeholder="CARTON" style="width: 180px;margin-bottom: 15px" />
                    <el-input v-model="listForm.drum" placeholder="DRUM" style="width: 180px;margin-bottom: 15px" />
                    <el-input v-model="listForm.bag" placeholder="BAG" style="width: 180px;margin-bottom: 15px" />
                    <el-input v-model="listForm.bare" placeholder="BARE" style="width: 180px;margin-bottom: 15px" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-input v-model="listForm.case" placeholder="CASE" style="width: 180px;margin-bottom: 15px" />
                    <el-input v-model="listForm.pallet" placeholder="PALLET" style="width: 180px;margin-bottom: 15px" />
                    <el-input v-model="listForm.roll" placeholder="ROLL" style="width: 180px;margin-bottom: 15px" />
                    <el-input v-model="listForm.other" placeholder="OTHER" style="width: 180px;margin-bottom: 15px" />
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-input v-model="listForm.box" placeholder="BOX" style="width: 180px;margin-bottom: 15px" />
                    <el-input v-model="listForm.bale" placeholder="BALE" style="width: 180px;margin-bottom: 15px" />
                    <el-input v-model="listForm.bundle" placeholder="BUNDLE" style="width: 180px;margin-bottom: 15px" />
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="GROSS WEIGHT:">
                      <el-input v-model="listForm.grossWeight" placeholder="" style="width: 180px" /> KGS
                    </el-form-item>
                    <el-form-item label="NET WEIGHT:">
                      <el-input v-model="listForm.netWeight" placeholder="" style="width: 180px" /> KGS
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-form-item label="VOLUME:">
                      <el-input v-model="listForm.volume" placeholder="" style="width: 180px" /> CU.M.
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="12">
                <el-form-item label="CONTAINERS:">
                  <el-radio v-model="listForm.radios" label="FCL">FCL</el-radio>
                  <el-radio v-model="listForm.radios" label="LCL">LCL</el-radio>
                </el-form-item>
                <el-form-item label="SHIPPING MARK:">
                  <el-input v-model="listForm.shippingMark" type="textarea" :rows="2" placeholder="" :autosize="{ minRows: 4, maxRows: 6}" />
                </el-form-item>
                <el-form-item label="INSPECTION MARK:">
                  <el-input v-model="listForm.inspectionMark" type="textarea" :rows="2" placeholder="" :autosize="{ minRows: 4, maxRows: 6}" />
                </el-form-item>
                <el-row>
                  <el-col :xs="24" :sm="24" :lg="14">
                    <el-form-item label="MANUFACTURING DATE:">
                      <el-date-picker
                        v-model="listForm.manufacturingDate"
                        width="30px"
                        type="date"
                        placeholder="生成日期"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="10">
                    <el-form-item label="EXPIRY DATE:">
                      <el-date-picker
                        v-model="listForm.expiryDate"
                        type="date"
                        placeholder="到期时间"
                        value-format="yyyy-MM-dd"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="GOODS FREE OF CHARGE:">
                  <el-radio v-model="listForm.charge" label="1">YES</el-radio>
                  <el-radio v-model="listForm.charge" label="2">NO</el-radio>
                </el-form-item>
                <el-form-item label="QUANTITY CHECK:">
                  <el-radio v-model="listForm.quantityCheck" label="TALLY">TALLY</el-radio>
                  <el-radio v-model="listForm.quantityCheck" label="WEIGHING">WEIGHING</el-radio>
                  <el-radio v-model="listForm.quantityCheck" label="VOLUME OR DRAFT">VOLUME OR DRAFT</el-radio>
                  <el-radio v-model="listForm.quantityCheck" label="OTHER">OTHER</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="200" style="border-top: 1px solid #000000;">
              <el-col :xs="24" :sm="24" :lg="8">
                <el-form-item label="DOCUMENTS RETURED WITH THE INSPECTION REPORT:">
                  <el-checkbox-group v-model="listForm.checkList8">
                    <el-checkbox label="INSPECTION ADDITIONAL SHEET     PAGE(S)" />
                    <el-checkbox label="CONTAINERS REPORT                       PAGE(S)" />
                    <el-checkbox label="DISCREPANCY REPORT                     PAGE(S)" />
                    <el-checkbox label="ANALYSIS/TEST REPORT                   PAGE(S)" />
                    <el-checkbox label="PACKING LIST(REVISED)                    PAGE(S)" />
                    <el-checkbox label="OTHERS(SPECIFY)                              PAGE(S)" />
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="16">
                <el-form-item label="DOCUMENT USED FOR INSPECTION" />
                <p>
                  <el-checkbox v-model="listForm.pinoCheck" @change="pinoChange">
                    <el-input v-model="listForm.pino" placeholder="P/I NO." :disabled="pinoDisabled" style="width: 220px" />
                    <el-input v-model="listForm.datet" placeholder="DATE" :disabled="pinoDisabled" style="width: 220px" />
                  </el-checkbox>
                </p>
                <p><el-checkbox v-model="listForm.packingList">PACKING LIST</el-checkbox></p>
                <p>
                  <el-checkbox v-model="listForm.otherCheck" @change="otherChange">
                    <el-input v-model="listForm.otherValue" placeholder="OTHER" :disabled="otherDisabled" style="width: 220px" />
                  </el-checkbox>
                </p>
                <el-form-item label="INSPECTION TIME:">
                  <el-input v-model="listForm.startedAT" placeholder="STARTED AT:" style="width: 220px" />
                  <el-input v-model="listForm.finishedAT" placeholder="FINISHED AT:" style="width: 220px" />
                </el-form-item>
                <el-form-item label="PHOTOS:">
                  <el-radio v-model="listForm.photos" label="1">Yes</el-radio>
                  <el-radio v-model="listForm.photos" label="2">NO</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-button type="primary" @click="preservationClick">保存</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="INSPECTION ADDITIONAL SHEET" name="second">
          <el-form ref="form" :label-position="labelPosition" :model="itionalForm">
            <el-row :gutter="8">
              <el-col :xs="24" :sm="24" :lg="8">
                <el-form-item label="IO NO.:">MF20160002667</el-form-item>
                <el-form-item label="INSPECTION NO.:">9876543210</el-form-item>
                <el-form-item label="INSPECTOR NAME:">NAME 321</el-form-item>
                <el-form-item label="INSPECTION OFFICE：">HAINAN</el-form-item>
                <el-form-item label="DESCRIPTION OF THE GOODS BY THE INSPECTOR:">
                  <el-input v-model="itionalForm.cargoDescription" type="textarea" :rows="2" placeholder="":autosize="{ minRows: 10, maxRows: 18}" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="8" />
              <el-col :xs="24" :sm="24" :lg="8" />
            </el-row>
            <el-button type="primary" @click="preservationClick">保存</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="DISCREPANCY REPORT" name="third">
          <el-form ref="form" :model="itionalForms">
            <el-row :gutter="8">
              <el-col :xs="24" :sm="24" :lg="8">
                <el-form-item label="IO NO.:">MF20160002667</el-form-item>
                <el-form-item label="INSPECTION NO.:">9876543210</el-form-item>
                <el-form-item label="INSPECTOR NAME:">NAME 321</el-form-item>
                <el-form-item label="INSPECTION OFFICE：">HAINAN</el-form-item>
                <el-form-item label="DESCRIPTION OF THE GOODS BY THE INSPECTOR:">
                  <el-input v-model="itionalForms.cargoDescription" type="textarea" :rows="2" placeholder="":autosize="{ minRows: 10, maxRows: 18}" />
                </el-form-item>
                <el-form-item label="CORRECTIVE ACTIONS:">
                  <el-input v-model="itionalForms.correctiveAction" type="textarea" :rows="2" placeholder="":autosize="{ minRows: 10, maxRows: 18}" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="8" />
              <el-col :xs="24" :sm="24" :lg="8" />
            </el-row>
          </el-form>
          <el-button type="primary" @click="preservationClick">保存</el-button>
        </el-tab-pane>
        <el-tab-pane label="SAVING REPORT" name="fourth">
          <el-form ref="form" :model="savingForms">
            <el-row :gutter="8">
              <el-col :xs="24" :sm="24" :lg="24">
                <p>QUALITY OF GOODS</p>
                <el-form-item label="a. Goods are damaged">
                  <el-radio v-model="savingForms.radioss" label="1">YES</el-radio>
                  <el-radio v-model="savingForms.radioss" label="2">NO</el-radio>
                  <el-radio v-model="savingForms.radioss" label="3">N/A</el-radio>
                  <el-input v-model="savingForms.corrective" placeholder="CORRECTIVE ACTION/ REMARKS" style="width: 220px" />
                  <el-input v-model="savingForms.savingAmount" placeholder="SAVING AMOUNT" style="width: 220px" />
                </el-form-item>
                <el-form-item label="b. Poor quality of goods">
                  <el-radio v-model="savingForms.radioss2" label="1">YES</el-radio>
                  <el-radio v-model="savingForms.radioss2" label="2">NO</el-radio>
                  <el-radio v-model="savingForms.radioss2" label="3">N/A</el-radio>
                  <el-input v-model="savingForms.corrective" placeholder="CORRECTIVE ACTION/ REMARKS" style="width: 220px" />
                  <el-input v-model="savingForms.savingAmount" placeholder="SAVING AMOUNT" style="width: 220px" />
                </el-form-item>
                <el-form-item label="c. Goods are declared new, but they are actually used or reconditioned.">
                  <el-radio v-model="savingForms.radioss3" label="1">YES</el-radio>
                  <el-radio v-model="savingForms.radioss3" label="2">NO</el-radio>
                  <el-radio v-model="savingForms.radioss3" label="3">N/A</el-radio>
                  <el-input v-model="savingForms.corrective" placeholder="CORRECTIVE ACTION/ REMARKS" style="width: 220px" />
                  <el-input v-model="savingForms.savingAmount" placeholder="SAVING AMOUNT" style="width: 220px" />
                </el-form-item>
                <p>QUALITY OF PACKING</p>
                <el-form-item label="a. Packing is damaged">
                  <el-radio v-model="savingForms.radioss4" label="1">YES</el-radio>
                  <el-radio v-model="savingForms.radioss4" label="2">NO</el-radio>
                  <el-radio v-model="savingForms.radioss4" label="3">N/A</el-radio>
                  <el-input v-model="savingForms.corrective" placeholder="CORRECTIVE ACTION/ REMARKS" style="width: 220px" />
                  <el-input v-model="savingForms.savingAmount" placeholder="SAVING AMOUNT" style="width: 220px" />
                </el-form-item>
                <el-form-item label="b. Packing is not adequate for transportation">
                  <el-radio v-model="savingForms.radioss5" label="1">YES</el-radio>
                  <el-radio v-model="savingForms.radioss5" label="2">NO</el-radio>
                  <el-radio v-model="savingForms.radioss5" label="3">N/A</el-radio>
                  <el-input v-model="savingForms.corrective" placeholder="CORRECTIVE ACTION/ REMARKS" style="width: 220px" />
                  <el-input v-model="savingForms.savingAmount" placeholder="SAVING AMOUNT" style="width: 220px" />
                </el-form-item>
                <el-form-item label="c. Packing has potential risk of damaging goods">
                  <el-radio v-model="savingForms.radioss6" label="1">YES</el-radio>
                  <el-radio v-model="savingForms.radioss6" label="2">NO</el-radio>
                  <el-radio v-model="savingForms.radioss6" label="3">N/A</el-radio>
                  <el-input v-model="savingForms.corrective" placeholder="CORRECTIVE ACTION/ REMARKS" style="width: 220px" />
                  <el-input v-model="savingForms.savingAmount" placeholder="SAVING AMOUNT" style="width: 220px" />
                </el-form-item>
                <p>QUALITY OF CONTAINER</p>
                <el-form-item label="a. Container is dirty">
                  <el-radio v-model="savingForms.radioss7" label="1">YES</el-radio>
                  <el-radio v-model="savingForms.radioss7" label="2">NO</el-radio>
                  <el-radio v-model="savingForms.radioss7" label="3">N/A</el-radio>
                  <el-input v-model="savingForms.corrective" placeholder="CORRECTIVE ACTION/ REMARKS" style="width: 220px" />
                  <el-input v-model="savingForms.savingAmount" placeholder="SAVING AMOUNT" style="width: 220px" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-button type="primary" @click="preservationClick">保存</el-button>
        </el-tab-pane>
        <el-tab-pane label="CONTAINERS REPORT" name="five">
          <el-table
            :key="tableKey"
            :data="continuedList"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column label="序号" prop="id" sortable="custom" align="center" width="80">
              <template slot-scope="{row}">
                <span>{{ row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="No." align="center">
              <template slot-scope="{row}">
                <span>{{ row.no }}</span>
              </template>
            </el-table-column>
            <el-table-column label="CONTAINER NO." align="center">
              <template slot-scope="{row}">
                <span>{{ row.containerNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="TYPE" align="center">
              <template slot-scope="{row}">
                <span class="link-type">{{ row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="STATU OF CONTAINER(DEFAULT FOR ACCEPTABLE)" align="center">
              <template slot-scope="{row}">
                <span>{{ row.statuOfContainer }}</span>
              </template>
            </el-table-column>
            <el-table-column label="INSPECTION SEAL NO." align="center">
              <template slot-scope="{row}">
                <span>{{ row.inspectionsealNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="OCCUPANCY RATE (IN %)" align="center">
              <template slot-scope="{row}">
                <span>{{ row.occupancyRate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="{row}">
                <el-button size="mini" type="primary" @click="handlePublish(row)">
                  编辑
                </el-button>
                <el-button size="mini" type="success">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="TAKE PHOTO" name="six">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-button type="primary" @click="preservationClick">保存</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogPublishVisible">
      <el-form ref="form">
        <el-form-item label="No.">
          <el-input />
        </el-form-item>
        <el-form-item label="CONTAINER NO.">
          <el-input />
        </el-form-item>
        <el-form-item label="TYPE">
          <el-input />
        </el-form-item>
        <el-form-item label="STATU OF CONTAINER(DEFAULT FOR ACCEPTABLE)">
          <el-input />
        </el-form-item>
        <el-form-item label="INSPECTION SEAL NO.">
          <el-input />
        </el-form-item>
        <el-form-item label="OCCUPANCY RATE (IN %)">
          <el-input />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPublishVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPublishVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetBusInfoForEdit } from '@/api/business'
import { getBusinessList } from '@/api/inspection/index'
import { tableMixin } from '../../mixin/commTable'
import Pagination from '@/components/Pagination'
import tree from '@/components/tree/tree'

export default {
  name: 'InspectionReport',
  components: { Pagination },
  mixins: [tableMixin],
  data() {
    return {
      tableKey: 0,
      activeName: 'first',
      labelPosition: 'right',
      listForm: {
        countryOrigin: '',
        busNO: '',
        csicReferenceNO: '',
        description: '',
        inspectionResult: '',
        quantity: '',
        visualInspection: '',
        appearance: '',
        packing: '',
        labeling: '',
        witness: '',
        shelfLife: '',
        loadingWitness: '',
        scope: '',
        otherValue: '',
        packageNO: '',
        isSampling: true,
        samplesNO: 0,
        carton: '',
        case: '',
        box: '',
        drum: '',
        pallet: '',
        bale: '',
        bag: '',
        roll: '',
        bundle: '',
        bare: '',
        other: '',
        quantityCheck: '',
        grossWeight: '',
        netWeight: '',
        volume: '',
        manufacturingDate: '',
        expiryDate: '',
        charge: true,
        shippingMark: '',
        inspectionMark: '',
        boxModel: '',
        boxNO: '',
        additional: true,
        additionalNum: 0,
        containers: true,
        containersNum: 0,
        discrepancy: true,
        discrepancyNum: 0,
        analysis: true,
        analysisNum: 0,
        packingRevised: true,
        packingNum: 0,
        otherRevised: true,
        otherNum: 0,
        isTemporary: true,
        firstChecked1: [],
        firstChecked2: [],
        firstChecked3: [],
        checkList8: [],
        radio: '',
        pinoCheck: false,
        pino: '',
        datet: '',
        packingList: false,
        otherCheck: false,
        otherPack: '',
        startedAT: '',
        finishedAT: '',
        photos: '2'
      },
      itionalForm: {
        cargoDescription: '',
        differenceDetails: ''
      },
      itionalForms: {
        differenceDetails: '',
        cargoDescription: '',
        correctiveAction: ''
      },
      savingForms: {
        quality: '',
        qualityType: '',
        qualityOfGoods: '',
        corrective: '',
        savingAmount: '',
        radios: '',
        radioss: '',
        radioss2: '',
        radioss3: '',
        radioss4: '',
        radioss5: '',
        radioss6: '',
        radioss7: ''
      },
      continuedList: [{ id: '', no: '', containerNo: '', type: '', statuOfContainer: '', inspectionsealNo: '', occupancyRate: '' }],
      pinoDisabled: true,
      otherDisabled: true,
      dialogPublishVisible: false
    }
  },
  created() {
    this.getBusInfoForEdit()
    console.log(this.$route.params.id)
  },
  methods: {
    getBusInfoForEdit() {
      const data = {
        id: this.$route.params.id
      }
      GetBusInfoForEdit(data).then(res => {
        if (res.success) {
          this.table.loading = false
          this.listForm.busNO = res.result.busNO
          this.listForm.exportCountry = res.result.exportCountry
          this.listForm.portCode = res.result.portCode
        }
      })
    },
    pinoChange() {
      if (this.pinoCheck === true) {
        this.pinoDisabled = true
      } else {
        this.pinoDisabled = false
      }
    },
    otherChange() {
      if (this.otherCheck === true) {
        this.otherDisabled = true
      } else {
        this.otherDisabled = false
      }
    },
    handleClick(tab, event) {
    },
    handlePublish(row) {
      this.temp = Object.assign({}, row)
      this.dialogPublishVisible = true
    },
    // 保存INSPECTION REPORT
    preservationClick() {
      const data = {
        // countryOrigin: 'CN',
        // busNO: this.listForm.busNO,
        // csicReferenceNO: 'CSICReferenceNO123',
        // description: this.listForm.description,
        // inspectionResult: this.listForm.inspectionResult,
        // quantity: this.listForm.quantity,
        // visualInspection: this.listForm.visualInspection,
        // appearance: this.listForm.appearance,
        // packing: this.listForm.packing,
        // labeling: this.listForm.labeling,
        // witness: this.listForm.witness,
        // shelfLife: this.listForm.shelfLife,
        // loadingWitness: this.listForm.loadingWitness,
        // scope: this.listForm.scope,
        // otherValue: this.listForm.otherValue,
        // packageNO: this.listForm.packageNO,
        // isSampling: true,
        // samplesNO: 10,
        // carton: this.listForm.carton,
        // case: this.listForm.case,
        // box: this.listForm.box,
        // drum: this.listForm.drum,
        // pallet: this.listForm.pallet,
        // bale: this.listForm.bale,
        // bag: this.listForm.bag,
        // roll: this.listForm.roll,
        // bundle: this.listForm.bundle,
        // bare: this.listForm.bare,
        // other: this.listForm.other,
        // quantityCheck: this.listForm.quantityCheck,
        // grossWeight: this.listForm.grossWeight,
        // netWeight: this.listForm.netWeight,
        // volume: this.listForm.volume,
        // manufacturingDate: this.listForm.manufacturingDate,
        // expiryDate: this.listForm.expiryDate,
        // charge: false,
        // shippingMark: this.listForm.shippingMark,
        // inspectionMark: this.listForm.inspectionMark,
        // boxModel: '20,40',
        // boxNO: '123,99',
        // pino: this.listForm.pino,
        // datet: '2020-07-09',
        // packingList: true,
        // otherPack: 'otherPack',
        // startedAT: '2020-07-09',
        // finishedAT: '2020-07-09',
        // photos: false,
        // additional: true,
        // additionalNum: 1,
        // containers: true,
        // containersNum: 1,
        // discrepancy: true,
        // discrepancyNum: 1,
        // analysis: true,
        // analysisNum: 1,
        // packingRevised: true,
        // packingNum: 1,
        // otherRevised: true,
        // otherNum: 1,
        // isTemporary: false,
        // id: this.$route.params.id
        countryOrigin: 'CN',
        busNO: this.listForm.busNO,
        csicReferenceNO: 'CSICReferenceNO123',
        description: '完整',
        inspectionResult: 's',
        quantity: 's',
        visualInspection: 's',
        appearance: '100',
        packing: 's',
        labeling: 's',
        witness: 's',
        shelfLife: 's',
        loadingWitness: 's',
        scope: '100',
        otherValue: '157',
        packageNO: '159',
        isSampling: true,
        samplesNO: 10,
        carton: '100',
        case: 'c',
        box: 'SDWD126655',
        drum: 'D',
        pallet: 'P',
        bale: 'B',
        bag: 'BAG',
        roll: 'r',
        bundle: 'R',
        bare: 'E',
        other: 'E',
        quantityCheck: 'TALLY',
        grossWeight: '500',
        netWeight: '350',
        volume: '80',
        manufacturingDate: '2020-07-09',
        expiryDate: '2020-07-09',
        charge: false,
        shippingMark: 'AA',
        inspectionMark: '标记',
        boxModel: '20,40',
        boxNO: '123,99',
        pino: 'po123',
        datet: '2020-07-09',
        packingList: true,
        otherPack: 'otherPack',
        startedAT: '2020-07-09',
        finishedAT: '2020-07-09',
        photos: false,
        additional: true,
        additionalNum: 1,
        containers: true,
        containersNum: 1,
        discrepancy: true,
        discrepancyNum: 1,
        analysis: true,
        analysisNum: 1,
        packingRevised: true,
        packingNum: 1,
        otherRevised: true,
        otherNum: 1,
        isTemporary: false
      }
      getBusinessList(data).then(res => {
        if (res.success) {
          this.table.loading = false
          this.$message.success('保存成功')
        }
      })
    }
    // 保存INSPECTION ADDITIONAL SHEET
    // 保存DISCREPANCY REPORT
    // 保存SAVING REPORT
    // 保存CONTAINERS REPORT
    // 保存TAKE PHOTO
  }
}
</script>

<style scoped>
  .page-container{background: rgb(240, 242, 245);padding: 20px;}
  .content{min-height: 100vh;background: #fff;padding: 20px;}
  .checkStyle{padding-bottom: 15px;font-size: 14px}
</style>
