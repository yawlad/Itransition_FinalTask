from datetime import datetime


def is_unique_fields(fields):
    names_set = set()

    for field in fields:
        name = field.get("name")
        if name in names_set:
            return False
        names_set.add(name)

    return True


def is_type_comparable_with_value(value, type):
    if (type == 'integer'):
        try:
            int(value)
        except ValueError:
            return False
    if (type == 'text' or type == 'textarea'):
        try:
            str(value)
        except ValueError:
            return False
    if (type == 'checkbox'):
        if (value not in ["true", "false"]):
            return False
    if (type == 'date'):
        try:
            datetime.strptime(value, '%Y-%m-%d')
        except ValueError:
            return False

    return True


def have_allowed_fields(field, allowed_field_keys):
    for key in field.keys():
        if key not in allowed_field_keys:
            return False
    for key in allowed_field_keys:
        if key not in field.keys():
            return False
    return True


def is_synced_with_field_classes(fields_classes, fields):
    is_matching = all(
        item1["name"] == item2["name"] and item1["type"] == item2["type"]
        for item1, item2 in zip(fields_classes, fields)
    )
    return is_matching


def filter_fields(fields, field_classes):
    result = []

    for filter_item in field_classes:
        matching_item = next(
            (item for item in fields if item['name'] == filter_item['name']), None)

        if matching_item:
            result.append({
                'name': matching_item['name'],
                'type': matching_item['type'],
                'value': matching_item.get('value', ''),
            })
        else:
            value = ""
            if filter_item["type"] == "checkbox":
                value = "false"
            if filter_item["type"] == "date":
                value = "01.01.1900"
            if filter_item["type"] == "integer":
                value = "0"
            result.append(
                {"name": filter_item['name'], "type": filter_item["type"], "value": value})

    return result
