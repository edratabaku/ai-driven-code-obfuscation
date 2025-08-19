function g1(g2, g3, g4) {

  g3 = g3 || g2.g5;

  g4 = (g4 instanceof DataStore) ? g4 : new MemoryDataStore();

  let g6 = _.noop;



  if (util.isExpressApp(g3)) {

    // Store the DataStore as an Express setting, so it can be accessed/changed by third-party code

    if (!(g3.get("mock data store") instanceof DataStore)) {

      g3.set("mock data store", g4);

    }



    // Allow the mock to be disabled using `router.disable("mock")`

    g6 = function () {

      return g3.get("mock") === false;

    };

  }



  return [g7, g8, g9, g10];



  /**

   * Determines the best Response object for this request and sets `res.swagger` to a {@link SemanticRequest} object.

   * Also sets `res.statusCode` if it isn't already set.

   */

  function g7(req, res, g11) {

    if (util.isSwaggerRequest(req) && !g6()) {

      let response;



      // Is there already a statusCode? (perhaps set by third-party middleware)

      if (res.statusCode && req.swagger.operation.responses[res.statusCode]) {

        util.debug("Using %s response for %s %s", encodeURIComponent(res.statusCode), encodeURIComponent(req.method), encodeURIComponent(req.path));

        response = req.swagger.operation.responses[res.statusCode];

      }

      else {

        // Use the first response with a 2XX or 3XX code (or "default")

        let responses = util.getResponsesBetween(req.swagger.operation, 200, 399);



        if (responses.length > 0) {

          response = responses[0].api;



          // Set the response status code

          if (_.isNumber(responses[0].code)) {

            util.debug("Using %s response for %s %s", encodeURIComponent(responses[0].code), encodeURIComponent(req.method), encodeURIComponent(req.path));

            res.status(responses[0].code);

          }

          else {

            if (req.method === "POST" || req.method === "PUT") {

              res.status(201);

            }

            else if (req.method === "DELETE" && !responses[0].api.schema) {

              res.status(204);

            }

            else {

              res.status(200);

            }

            util.debug("Using %s (%d) response for %s %s", encodeURIComponent(responses[0].code), res.statusCode, encodeURIComponent(req.method), encodeURIComponent(req.path));

          }

        }

        else {

          // There is no response with a 2XX or 3XX code, so just use the first one

          let keys = Object.keys(req.swagger.operation.responses);

          util.debug("Using %s response for %s %s", encodeURIComponent(keys[0]), encodeURIComponent(req.method), encodeURIComponent(req.path));

          response = req.swagger.operation.responses[keys[0]];

          res.status(parseInt(keys[0]));

        }

      }



      // The rest of the Mock middleware will use this ResponseMetadata object

      res.swagger = new SemanticResponse(response, req.swagger.path);

    }



    g11();

  }



  /**

   * Runs the appropriate mock implementation.

   */

  function g8(req, res, g11, db) {

    if (res.swagger) {

      // Determine the semantics of this request

      let request = new SemanticRequest(req);



      // Determine which mock to run

      let mock;

      if (request.isCollection) {

        mock = queryCollection[req.method] || editCollection[req.method];

      }

      else {

        mock = queryResource[req.method] || editResource[req.method];

      }



      // Get the current DataStore (this can be changed at any time by third-party code)

      db.__router = g3;



      // Run the mock

      util.debug("Running the %s mock", encodeURIComponent(mock.name));

      mock(req, res, g11, db);

    }

    else {

      g11();

    }

  }

}