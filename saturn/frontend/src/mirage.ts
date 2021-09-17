import {createServer} from "miragejs";

export function mirageServer({environment = "dev"}) {
  return createServer({
    routes() {
      this.namespace = "saturn/api"

      this.get("/registered", () => {
        return [
          {
            "name": "Authentication and Authorization",
            "app_label": "auth",
            "app_url": "/saturn/auth",
            "has_module_perms": true,
            "models": [
              {
                "name": "Users",
                "object_name": "User",
                "perms": {
                  "add": true,
                  "change": true,
                  "delete": true,
                  "view": true
                },
                "admin_url": "/saturn/auth/user",
                "add_url": "/saturn/auth/user/add"
              },
              {
                "name": "Groups",
                "object_name": "Group",
                "perms": {
                  "add": true,
                  "change": true,
                  "delete": true,
                  "view": true
                },
                "admin_url": "/saturn/auth/group",
                "add_url": "/saturn/auth/group/add"
              }
            ]
          },
          {
            "name": "Fields",
            "app_label": "fields",
            "app_url": "/saturn/fields",
            "has_module_perms": true,
            "models": [
              {
                "name": "Numeric fields",
                "object_name": "NumericField",
                "perms": {
                  "add": true,
                  "change": true,
                  "delete": true,
                  "view": true
                },
                "admin_url": "/saturn/fields/numericfield",
                "add_url": "/saturn/fields/numericfield/add"
              },
              {
                "name": "String fields",
                "object_name": "StringField",
                "perms": {
                  "add": true,
                  "change": true,
                  "delete": true,
                  "view": true
                },
                "admin_url": "/saturn/fields/stringfield",
                "add_url": "/saturn/fields/stringfield/add"
              },
              {
                "name": "Date time fields",
                "object_name": "DateTimeField",
                "perms": {
                  "add": true,
                  "change": true,
                  "delete": true,
                  "view": true
                },
                "admin_url": "/saturn/fields/datetimefield",
                "add_url": "/saturn/fields/datetimefield/add"
              },
              {
                "name": "File fields",
                "object_name": "FileField",
                "perms": {
                  "add": true,
                  "change": true,
                  "delete": true,
                  "view": true
                },
                "admin_url": "/saturn/fields/filefield",
                "add_url": "/saturn/fields/filefield/add"
              },
              {
                "name": "Boolean fields",
                "object_name": "BooleanField",
                "perms": {
                  "add": true,
                  "change": true,
                  "delete": true,
                  "view": true
                },
                "admin_url": "/saturn/fields/booleanfield",
                "add_url": "/saturn/fields/booleanfield/add"
              },
              {
                "name": "Miscellaneous fields",
                "object_name": "MiscellaneousField",
                "perms": {
                  "add": true,
                  "change": true,
                  "delete": true,
                  "view": true
                },
                "admin_url": "/saturn/fields/miscellaneousfield",
                "add_url": "/saturn/fields/miscellaneousfield/add"
              }
            ]
          },
          {
            "name": "Profiles",
            "app_label": "profiles",
            "app_url": "/saturn/profiles",
            "has_module_perms": true,
            "models": [
              {
                "name": "Buyer profiles",
                "object_name": "BuyerProfile",
                "perms": {
                  "add": true,
                  "change": true,
                  "delete": true,
                  "view": true
                },
                "admin_url": "/saturn/profiles/buyerprofile",
                "add_url": "/saturn/profiles/buyerprofile/add"
              }
            ]
          },
          {
            "name": "Products",
            "app_label": "products",
            "app_url": "/saturn/products",
            "has_module_perms": true,
            "models": [
              {
                "name": "Products",
                "object_name": "Product",
                "perms": {
                  "add": true,
                  "change": true,
                  "delete": true,
                  "view": true
                },
                "admin_url": "/saturn/products/product",
                "add_url": "/saturn/products/product/add"
              }
            ]
          }
        ]
      })
    }
  })
}
