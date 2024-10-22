let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
import {database} from "../database"

chai.use(chaiHttp);




const SERVER_URL = "http://localhost:3000"



describe('/ADD metrics', () => {

    it('it should add metrics', (done) => {

        let metrics = "1649941817 Voltage 1.34\n"+
                       "1649941818 Voltage 1.35\n"+
                       "1649941817 Current 12.0\n"+
                      "1649941818 Current 14.0"
        
        chai.request(SERVER_URL)
            .post('/data')
            .set('Content-Type', 'text/plain')
            .send(metrics)
            .end((err:any, res:any) => {
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('success').eql(true);
                done();
            });
       
    });

    it('it should not add metrics', (done) => {

        let metrics = "1649941817 Voltage 1.34\n"+
                       "1649941818 1.35 Voltage\n"
        
        chai.request(SERVER_URL)
            .post('/data')
            .set('Content-Type', 'text/plain')
            .send(metrics)
            .end((err:any, res:any) => {
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('success').eql(false);
                done();
            });
       
    });

    it('it should get metrics between dates', (done) => {

        let metrics = "1649941817 Voltage 1.34\n"+
                       "1649941818 Voltage 1.35\n"+
                       "1649941817 Current 12.0\n"+
                      "1649941818 Current 14.0"
        
        chai.request(SERVER_URL)
            .post('/data')
            .set('Content-Type', 'text/plain')
            .send(metrics)
            .end((err:any, res:any) => {
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('success').eql(true);
                chai.request(SERVER_URL)
                .get('/data?from=2022-04-14&to=2022-04-15')
                .end((err:any, res:any) => {
                    res.body.should.be.a('array');
                    res.body.length.should.be.gt(0);
                    
                    done();
                });
            });

            
       
    });
});

